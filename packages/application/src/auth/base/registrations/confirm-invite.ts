import { and, eq } from "@alianza/database/drizzle"
import { users, userTenants } from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { isAfter } from "date-fns"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"
import { hashPassword, isSSO } from "../../utils"

const confirmInviteSchema = z.object({
    token: z.string().min(1),
    password: z.string().optional(),
})

export const confirmInvite = createAction({ schema: confirmInviteSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token, password } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const userTenant = await db._query.userTenants.findFirst({
            columns: {
                id: true,
                invitationExpiresAt: true,
                invitationToken: true,
            },
            with: {
                user: {
                    columns: {
                        id: true,
                        email: true,
                        emailConfirmed: true,
                    },
                },
                tenant: {
                    columns: {
                        id: true,
                    },
                    with: {
                        tenantSamlProviders: {
                            columns: {
                                id: true,
                                domain: true,
                            },
                        },
                    },
                },
            },
            where: (userTenants, { eq }) => eq(userTenants.invitationToken, token),
        })

        if (!userTenant) {
            throw new ApplicationError("authInviteNotFoundOrExpired")
        }

        if (isAfter(new Date(), userTenant.invitationExpiresAt)) {
            throw new ApplicationError("authInviteNotFoundOrExpired")
        }

        const userIsSSO = isSSO(userTenant.user.email, userTenant.tenant.tenantSamlProviders)
        const userTenantId = userTenant.id
        const userId = userTenant.user.id
        const isUserConfirmed = userTenant.user.emailConfirmed

        const confirmInviteWithTransaction = async (tx: AuthDatabaseTransaction) => {
            if (!isUserConfirmed) {
                await tx
                    .update(users)
                    .set({
                        ...(!userIsSSO && password ? { password: hashPassword(password) } : {}),
                        emailConfirmed: true,
                        emailConfirmedAt: new Date(),
                    })
                    .where(and(eq(users.id, userId), eq(users.emailConfirmed, false)))
            }

            await tx
                .update(userTenants)
                .set({
                    invitationToken: null,
                    invitationExpiresAt: null,
                    invitationConfirmedAt: new Date(),
                })
                .where(eq(userTenants.id, userTenantId))
        }

        if (!dbTransaction) {
            throw new ApplicationError("databaseNotFound")
        }

        if (dbClient) {
            await dbClient.transaction(confirmInviteWithTransaction)
        } else {
            await confirmInviteWithTransaction(dbTransaction)
        }

        return {
            user: userTenant.user,
        }
    })

export type ConfirmInviteResult = Awaited<ReturnType<typeof confirmInvite>>["data"]
