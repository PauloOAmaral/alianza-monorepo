import { eq } from '@alianza/database/drizzle'
import { users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { comparePasswords, hashPassword } from '../../utils'

const changePasswordSchema = z.object({
    userId: z.string().min(1),
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1)
})

export const changePassword = createAction({ schema: changePasswordSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, currentPassword, newPassword } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const user = await db._query.users.findFirst({
            columns: {
                id: true,
                password: true
            },
            with: {
                userTenantSamlProviders: {
                    columns: {
                        id: true
                    }
                }
            },
            where: (users, { eq }) => eq(users.id, userId)
        })

        if (!user) {
            throw new ApplicationError('authUserNotFound')
        }

        if (user.userTenantSamlProviders.length) {
            throw new ApplicationError('authDomainConfiguredForSaml')
        }

        if (!user.password) {
            throw new ApplicationError('authInvalidPassword')
        }

        const validPassword = comparePasswords(currentPassword, user.password)

        if (!validPassword) {
            throw new ApplicationError('authInvalidPassword')
        }

        const hashedPassword = hashPassword(newPassword)

        await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId))
    })

export type ChangePasswordResult = Awaited<ReturnType<typeof changePassword>>['data']
