import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { isAfter } from "date-fns"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const validatePasswordResetTokenSchema = z.object({
    token: z.string().min(1),
})

export const validatePasswordResetToken = createAction({
    schema: validatePasswordResetTokenSchema,
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const passwordReset = await db._query.userPasswordReset.findFirst({
            columns: {
                id: true,
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

        if (passwordReset.user.userTenantSamlProviders.length > 0) {
            throw new ApplicationError("authDomainConfiguredForSaml")
        }
    })

export type ValidatePasswordResetTokenResult = Awaited<
    ReturnType<typeof validatePasswordResetToken>
>["data"]
