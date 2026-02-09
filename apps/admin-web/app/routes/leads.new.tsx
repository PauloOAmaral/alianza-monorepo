import { createLeadCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { data } from 'react-router'
import { leadSourceCodeByValue } from '~/features/leads/lead-sources'
import { createLeadSchema } from '~/features/leads/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/leads.new'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)
    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()
    const { success, value, errors } = await parseFormDataWithZod(formData, createLeadSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('serverError.unexpected'))
        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        const result = await createLeadCommand(
            createRequest(request, {
                name: value.name,
                primaryPhoneCountryCode: value.primaryPhoneCountryCode ?? null,
                primaryPhoneNumber: value.primaryPhoneNumber,
                email: value.email ?? null,
                leadSource: leadSourceCodeByValue.get(value.source) ?? 0,
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

        if (result.data.status === 'duplicate') {
            return data({ status: 'duplicate', duplicate: result.data.duplicate }, { status: 409 })
        }

        return await dataWithSuccess({ status: 'created' }, t('leads.messages.created'))
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('serverError.unexpected'))
    }
}
