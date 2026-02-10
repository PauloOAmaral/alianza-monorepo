import { createMainDbClient } from '@alianza/database/clients/main'
import { isNull, notInArray } from '@alianza/database/drizzle'
import { sellers } from '@alianza/database/schemas/admin'
import { userContexts } from '@alianza/database/schemas/common'
import { createAction } from '../../../action-builder'

export const getUserContextOptionsForSellerQuery = createAction()
    .build(async () => {
        const db = createMainDbClient()

        const existingSellerContextIds = await db
            .select({ userContextId: sellers.userContextId })
            .from(sellers)
            .where(isNull(sellers.deletedAt))

        const ids = existingSellerContextIds.map((r) => r.userContextId)

        const options = await db.query.userContexts.findMany({
            columns: {
                id: true
            },
            with: {
                user: {
                    columns: {
                        email: true
                    },
                    with: {
                        userProfile: {
                            columns: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            },
            where: ids.length > 0 ? notInArray(userContexts.id, ids) : undefined,
            orderBy: (uc, { asc }) => asc(uc.id)
        })

        return options.map((ctx) => {
            const profile = ctx.user?.userProfile
            const firstName = profile?.firstName ?? ''
            const lastName = profile?.lastName ?? ''
            const fullName = `${firstName} ${lastName}`.trim()

            return {
                id: ctx.id,
                label: fullName || ctx.user?.email || ctx.id
            }
        })
    })

export type GetUserContextOptionsForSellerQuery = Awaited<
    ReturnType<typeof getUserContextOptionsForSellerQuery>
>
