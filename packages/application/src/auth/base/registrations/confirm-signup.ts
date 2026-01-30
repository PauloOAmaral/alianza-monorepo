import { eq } from "@alianza/database/drizzle"
import { users, userTenants } from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { isAfter } from "date-fns"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const confirmSignupSchema = z.object({
    token: z.string().min(1),
})

export const confirmSignup = createAction({ schema: confirmSignupSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token } = data
        const db = dbClient || dbTransaction!

        const userTenant = await db._query.userTenants.findFirst({
            columns: {
                id: true,
                userId: true,
                tenantId: true,
                invitationExpiresAt: true,
                invitationToken: true,
            },
            where: (userTenants, { and, eq, isNull, exists }) =>
                and(
                    eq(userTenants.invitationToken, token),
                    isNull(userTenants.invitationConfirmedAt),
                    exists(
                        db
                            .select()
                            .from(users)
                            .where(
                                and(
                                    eq(users.id, userTenants.userId),
                                    eq(users.emailConfirmed, false),
                                ),
                            ),
                    ),
                ),
        })

        if (!userTenant) {
            throw new ApplicationError("authUserNotFound")
        }

        if (isAfter(new Date(), userTenant.invitationExpiresAt!)) {
            throw new ApplicationError("authSignupConfirmationExpired")
        }

        await db
            .update(users)
            .set({
                emailConfirmed: true,
                emailConfirmedAt: new Date(),
            })
            .where(eq(users.id, userTenant.userId))

        const firstUserTenant = await db._query.userTenants.findFirst({
            columns: {
                tenantId: true,
            },
            where: eq(userTenants.userId, userTenant.userId),
        })

        if (!firstUserTenant) {
            throw new ApplicationError("authUserHasNoTenant")
        }

        return {
            userId: userTenant.userId,
            currentTenantId: firstUserTenant.tenantId,
        }
    })

export type ConfirmSignupResult = Awaited<ReturnType<typeof confirmSignup>>["data"]
