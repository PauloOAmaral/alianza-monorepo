import { nanoid } from '@alianza/database/nanoid'
import { userContextPermissionGroups, userContexts, userProfiles, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { getOrCreateDefaultPermissionGroup } from '../_shared'
import { hashPassword } from '../../utils'

const createUserAndTenantSchema = z.object({
    user: z.object({
        email: z.email(),
        password: z.string().optional(),
        firstName: z.string().min(1),
        lastName: z.string().min(1)
    })
})

export const createUserAndTenant = createAction({ schema: createUserAndTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { user } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const createUserAndContextTransaction = async (transaction: AuthDatabaseTransaction) => {
            const existingUser = await transaction._query.users.findFirst({
                columns: { id: true },
                where: (users, { eq }) => eq(users.email, user.email)
            })

            if (existingUser) {
                throw new ApplicationError('authUserAlreadyExists')
            }

            const { permissionGroup } = (
                await getOrCreateDefaultPermissionGroup({ data: {}, dbTransaction: transaction })
            ).data

            const userProfileId = nanoid(16)
            await transaction.insert(userProfiles).values({
                id: userProfileId,
                firstName: user.firstName,
                lastName: user.lastName
            })

            const userId = nanoid(16)
            await transaction.insert(users).values({
                id: userId,
                email: user.email,
                userProfileId,
                password: user.password ? hashPassword(user.password) : null,
                emailConfirmed: true,
                emailConfirmedAt: new Date()
            })

            const userContextId = nanoid(16)
            await transaction.insert(userContexts).values({
                id: userContextId,
                userId,
                invitationToken: null,
                invitationExpiresAt: null,
                invitationConfirmedAt: new Date()
            })

            await transaction.insert(userContextPermissionGroups).values({
                id: nanoid(16),
                userContextId,
                permissionGroupId: permissionGroup.id
            })

            return {
                permissionGroup,
                user: {
                    id: userId,
                    email: user.email,
                    userProfile: { id: userProfileId, firstName: user.firstName, lastName: user.lastName },
                    userContext: { id: userContextId }
                }
            }
        }

        if (dbClient) {
            return await dbClient.transaction(createUserAndContextTransaction)
        }

        return await createUserAndContextTransaction(dbTransaction!)
    })

export type CreateUserAndTenantResult = Awaited<ReturnType<typeof createUserAndTenant>>['data']
