import { createLeadCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getInternalCampaignOptionsQuery, getPhoneCountriesQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { LeadNewDialog } from '~/features/leadsNew/lead-form'
import { createLeadSchema } from '~/features/leadsNew/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/leads-new'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, createLeadSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        await createLeadCommand(
            createRequest(request, {
                name: value.name,
                primaryPhoneCountryCode: value.primaryPhoneCountryCode,
                primaryPhoneNumber: value.primaryPhoneNumber,
                email: value.email,
                leadSource: value.source,
                internalCampaignId: value.internalCampaignId,
                sellerId: value.sellerId,
                companyId: value.companyId
            })
        )

        return await dataWithSuccess({ status: 'created' }, t('dialogs.leads.new.success'))
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('errors.unexpectedError'))
    }
}

export async function loader({ request }: Route.LoaderArgs) {
    await requireSession(request)

    return {
        campaigns: getInternalCampaignOptionsQuery(request),
        phoneCountries: getPhoneCountriesQuery(request)
    }
}

export default LeadNewDialog
