import { updateLeadCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getInternalCampaignOptionsQuery, getLeadByIdQuery, getPhoneCountriesQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { LeadEditDialog } from '~/features/leadsEdit/lead-form'
import { updateLeadSchema } from '~/features/leadsEdit/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/leads-edit'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, updateLeadSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        await updateLeadCommand(
            createRequest(request, {
                leadId: value.leadId,
                name: value.name,
                primaryPhoneCountryCode: value.primaryPhoneCountryCode,
                primaryPhoneNumber: value.primaryPhoneNumber,
                email: value.email ?? null,
                leadSource: value.source,
                internalCampaignId: value.internalCampaignId ?? null,
                status: value.status ?? null,
                sellerId: value.sellerId ?? null,
                companyId: value.companyId ?? null,
                disciplineId: value.disciplineId ?? null,
                secondaryPhoneCountryCode: value.secondaryPhoneCountryCode ?? null,
                secondaryPhoneNumber: value.secondaryPhoneNumber ?? null,
                gender: value.gender ?? null,
                age: value.age ?? null,
                reason: value.reason ?? null,
                eventSourceUrl: value.eventSourceUrl ?? null,
                allowDuplicateEmail: value.allowDuplicateEmail,
                allowDuplicatePhone: value.allowDuplicatePhone
            })
        )

        return await dataWithSuccess({ status: 'updated' }, t('dialogs.leads.edit.success'))
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('errors.unexpectedError'))
    }
}

export async function loader({ request, params }: Route.LoaderArgs) {
    requireSession(request)

    return {
        lead: getLeadByIdQuery(createRequest(request, { id: params.id })),
        campaigns: getInternalCampaignOptionsQuery(request),
        phoneCountries: getPhoneCountriesQuery(request)
    }
}

export default LeadEditDialog
