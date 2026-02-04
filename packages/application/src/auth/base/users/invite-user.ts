import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { addUserContext } from './add-user-to-tenant'

const inviteUserSchema = z.object({
    email: z.string().min(1),
    permissionGroupIds: z.array(z.string())
})

export const inviteUser = createAction({ schema: inviteUserSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, permissionGroupIds } = data

        const result = await addUserContext({
            data: {
                email,
                permissionGroupIds
            },
            dbClient,
            dbTransaction
        })

        const createdUser = result.data

        if (!createdUser.userContext.invitationToken) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            token: createdUser.userContext.invitationToken,
            email: createdUser.email,
            firstName: createdUser.userProfile.firstName,
            lastName: createdUser.userProfile.lastName
        }
    })

export type InviteUserResult = Awaited<ReturnType<typeof inviteUser>>['data']
