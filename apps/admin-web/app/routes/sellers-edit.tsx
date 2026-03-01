import { updateSellerCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getSellerByIdQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { SellerEditDialog } from '~/features/sellersEdit/seller-form'
import { updateSellerSchema } from '~/features/sellersEdit/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/sellers-edit'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, updateSellerSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        await updateSellerCommand(
            createRequest(request, {
                id: value.sellerId,
                referralCode: value.referralCode,
                leadPrefix: value.leadPrefix,
                dailyToSell: value.dailyToSell ?? null,
                dailyExperimentalClass: value.dailyExperimentalClass ?? null,
                pixelId: value.pixelId?.trim() || null,
                pixelSecret: value.pixelSecret?.trim() || null,
                isActive: value.isActive
            })
        )

        return await dataWithSuccess({ status: 'updated' }, t('dialogs.sellers.edit.success'))
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
        seller: getSellerByIdQuery(createRequest(request, { id: params.id }))
    }
}

export default SellerEditDialog
