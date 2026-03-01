import { updateUserCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getUserByIdQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { createRequest } from '~/utils/server/request-builder'
import { UserEditDialog } from '~/features/usersEdit/user-form'
import { updateUserSchema } from '~/features/usersEdit/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/users-edit'

export async function action({ request }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, updateUserSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        await updateUserCommand(
            createRequest(request, {
                userId: value.userId,
                email: value.email,
                firstName: value.firstName ?? null,
                lastName: value.lastName ?? null
            })
        )

        return await dataWithSuccess({ status: 'updated' }, t('dialogs.users.edit.success'))
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
        user: getUserByIdQuery(createRequest(request, { id: params.id }))
    }
}

export default UserEditDialog
