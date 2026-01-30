import { createMainDbClient } from "@alianza/database/clients/main"
import { userTenantPermissionGroups } from "@alianza/database/schemas/common"
import type { AuthDatabaseClient } from "@alianza/database/types/common"
import { z } from "zod"
import { ENV } from "~/utils/env"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"
import { getSession as baseGetSession } from "../../base"
import { getCachedOrFetch } from "../../utils"

async function getUserSessionQuery(db: AuthDatabaseClient, sessionId: string) {
    return db._query.userSessions.findFirst({
        columns: {
            currentTenantId: true,
        },
        with: {
            user: {
                with: {
                    userTenantSamlProviders: {
                        columns: { id: true },
                    },
                    userTenants: {
                        columns: {
                            tenantId: true,
                        },
                        with: {
                            permissionGroups: {
                                columns: {},
                                with: {
                                    permissionGroup: {
                                        columns: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                        where: (userTenants, { eq, exists }) =>
                            exists(
                                db
                                    .select({ id: userTenantPermissionGroups.id })
                                    .from(userTenantPermissionGroups)
                                    .where(
                                        eq(userTenantPermissionGroups.userTenantId, userTenants.id),
                                    ),
                            ),
                    },
                },
            },
            currentTenant: {
                columns: {
                    id: true
                }
            },
        },
        where: (userSessions, { eq }) => eq(userSessions.id, sessionId),
    })
}

const getCachedSessionSchema = z.object({
    sessionId: z.string().min(1),
})

export const getCachedSession = createAction({ schema: getCachedSessionSchema })
    .withData()
    .build(async ({ data }) => {
        const { sessionId } = data
        const db = createMainDbClient()

        return getCachedOrFetch({
            sessionId,
            ttlSeconds: Number(ENV.SESSION_CACHE_TTL),
            sessionFetchFn: async () => {
                const [baseSession, projectSession] = await Promise.all([
                    baseGetSession({
                        data: { sessionId },
                        dbClient: db,
                    }),
                    getUserSessionQuery(db, sessionId),
                ])

                if (!projectSession) {
                    throw new ApplicationError("commonNotFound")
                }

                const currentUserTenant = projectSession.user.userTenants.find(
                    (ut) => ut.tenantId === projectSession.currentTenantId,
                )

                if (!currentUserTenant) {
                    throw new ApplicationError("commonNotFound")
                }

                const permissionGroups = currentUserTenant.permissionGroups.map(
                    (permissionGroup) => ({
                        id: permissionGroup.permissionGroup.id,
                        name: permissionGroup.permissionGroup.name,
                    }),
                )

                return {
                    id: baseSession.data.id,
                    userAgent: baseSession.data.userAgent,
                    ipAddress: baseSession.data.ipAddress,
                    expiresAt: baseSession.data.expiresAt,
                    createdAt: baseSession.data.createdAt,
                    updatedAt: baseSession.data.updatedAt,
                    user: {
                        id: baseSession.data.user.id,
                        email: baseSession.data.user.email,
                        firstName: baseSession.data.user.firstName,
                        lastName: baseSession.data.user.lastName,
                        fullName: baseSession.data.user.fullName,
                        avatar: baseSession.data.user.avatar,
                    },
                    currentTenant: {
                        id: baseSession.data.currentTenant.id,
                        name: baseSession.data.currentTenant.name,
                        legalName: baseSession.data.currentTenant.legalName
                    },
                    permissionGroups,
                }
            },
        })
    })

export type UserSession = NonNullable<Awaited<ReturnType<typeof getCachedSession>>["data"]>
