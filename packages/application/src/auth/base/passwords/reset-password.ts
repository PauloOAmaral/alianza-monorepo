import { eq } from "@alianza/database/drizzle"
import { userPasswordReset, users } from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { isAfter } from "date-fns"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"
import { hashPassword } from "../../utils"

const resetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(1),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable(),
})

export const resetPassword = createAction({ schema: resetPasswordSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token, password, userAgent, ipAddress } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const passwordReset = await db._query.userPasswordReset.findFirst({
            columns: {
                id: true,
                userId: true,
                expiresAt: true,
                usedAt: true,
            },
            with: {
                user: {
                    columns: {},
                    with: {
                        userTenantSamlProviders: {
                            columns: {
                                id: true,
                            },
                        },
                    },
                },
            },
            where: (userPasswordReset, { and, eq, isNull }) =>
                and(eq(userPasswordReset.token, token), isNull(userPasswordReset.usedAt)),
        })

        if (!passwordReset) {
            throw new ApplicationError("authPasswordResetNotFoundOrExpired")
        }

        if (isAfter(new Date(), passwordReset.expiresAt)) {
            throw new ApplicationError("authPasswordResetNotFoundOrExpired")
        }

        if (passwordReset.user.userTenantSamlProviders.length) {
            throw new ApplicationError("authDomainConfiguredForSaml")
        }

        const resetPasswordWithTransaction = async (tx: AuthDatabaseTransaction) => {
            await tx
                .update(users)
                .set({
                    password: hashPassword(password),
                })
                .where(eq(users.id, passwordReset.userId))

            await tx
                .update(userPasswordReset)
                .set({
                    usedAt: new Date(),
                    userAgent,
                    ipAddress,
                })
                .where(eq(userPasswordReset.id, passwordReset.id))
        }

        if (dbClient) {
            await dbClient.transaction(resetPasswordWithTransaction)
        } else {
            await resetPasswordWithTransaction(dbTransaction!)
        }
    })

export type ResetPasswordResult = Awaited<ReturnType<typeof resetPassword>>["data"]
