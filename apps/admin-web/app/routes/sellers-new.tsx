import { createSellerCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getUserContextOptionsForSellerQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { createSellerSchema } from '~/features/sellersNew/schema'
import { SellerNewDialog } from '~/features/sellersNew/seller-form'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, redirectWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/sellers-new'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, createSellerSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        await createSellerCommand(
            createRequest(request, {
                userContextId: value.userContextId,
                referralCode: value.referralCode,
                leadPrefix: value.leadPrefix,
                dailyToSell: value.dailyToSell ?? null,
                dailyExperimentalClass: value.dailyExperimentalClass ?? null,
                pixelId: value.pixelId ?? null,
                pixelSecret: value.pixelSecret ?? null
            })
        )

        return await redirectWithSuccess('/sellers', t('dialogs.sellers.new.success'))
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('errors.unexpectedError'))
    }
}

export async function loader({ request }: Route.LoaderArgs) {
    await requireSession(request)

    const result = await getUserContextOptionsForSellerQuery(request)

    return {
        userContextOptions: result.data
    }
}

export default SellerNewDialog
