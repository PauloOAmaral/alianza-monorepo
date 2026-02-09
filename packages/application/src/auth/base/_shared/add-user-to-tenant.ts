import { and, eq } from '@alianza/database/drizzle'
import { nanoid } from '@alianza/database/nanoid'
import { userContextPermissionGroups, userContexts, userProfiles, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { addDays } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const addUserContextCoreSchema = z.object({
    email: z.string().min(1),
    permissionGroupIds: z.array(z.string())
})

export const addUserContextCore = createAction({ schema: addUserContextCoreSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, permissionGroupIds } = data

        const addUserContextCoreTransaction = async (transaction: AuthDatabaseTransaction) => {
            const existingUser = await transaction.query.users.findFirst({
                columns: {
                    id: true,
                    email: true
                },
                with: {
                    userProfile: {
                        columns: {
                            firstName: true,
                            lastName: true
                        }
                    }
                },
                where: eq(users.email, email)
            })

            if (!existingUser) {
                const userProfileId = nanoid(16)
                const [createdUserProfile] = await transaction.insert(userProfiles).values({ id: userProfileId }).returning({
                    id: userProfiles.id,
                    firstName: userProfiles.firstName,
                    lastName: userProfiles.lastName
                })

                if (!createdUserProfile) {
                    throw new ApplicationError('unexpectedError')
                }

                const userId = nanoid(16)
                const [createdUser] = await transaction
                    .insert(users)
                    .values({
                        id: userId,
                        email,
                        userProfileId: createdUserProfile.id
                    })
                    .returning({
                        id: users.id,
                        email: users.email
                    })

                if (!createdUser) {
                    throw new ApplicationError('unexpectedError')
                }

                const userContextId = nanoid(16)
                const [createdUserContext] = await transaction
                    .insert(userContexts)
                    .values({
                        id: userContextId,
                        userId: createdUser.id,
                        invitationToken: nanoid(32),
                        invitationExpiresAt: addDays(new Date(), 7)
                    })
                    .returning({
                        id: userContexts.id,
                        invitationToken: userContexts.invitationToken
                    })

                if (!createdUserContext) {
                    throw new ApplicationError('unexpectedError')
                }

                await transaction.insert(userContextPermissionGroups).values(
                    permissionGroupIds.map(permissionGroupId => ({
                        id: nanoid(16),
                        userContextId: createdUserContext.id,
                        permissionGroupId
                    }))
                )

                return {
                    id: createdUser.id,
                    email: createdUser.email,
                    userProfile: createdUserProfile,
                    userContext: createdUserContext
                }
            }

            const userContextId = nanoid(16)
            const [createdUserContext] = await transaction
                .insert(userContexts)
                .values({
                    id: userContextId,
                    userId: existingUser.id,
                    invitationToken: nanoid(32),
                    invitationExpiresAt: addDays(new Date(), 7)
                })
                .returning({
                    id: userContexts.id,
                    invitationToken: userContexts.invitationToken
                })

            if (!createdUserContext) {
                throw new ApplicationError('unexpectedError')
            }

            await transaction.insert(userContextPermissionGroups).values(
                permissionGroupIds.map(permissionGroupId => ({
                    id: nanoid(16),
                    userContextId: createdUserContext.id,
                    permissionGroupId
                }))
            )

            return {
                id: existingUser.id,
                email: existingUser.email,
                userProfile: existingUser.userProfile,
                userContext: createdUserContext
            }
        }

        if (dbClient) {
            return await dbClient.transaction(addUserContextCoreTransaction)
        }

        return await addUserContextCoreTransaction(dbTransaction!)
    })

export type AddUserContextResult = Awaited<ReturnType<typeof addUserContextCore>>['data']
