import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, isNull } from '@alianza/database/drizzle'
import { sellers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    id: z.string().min(1)
})

export const getSellerByIdQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id } = data

        const db = createMainDbClient()

        const result = await db.query.sellers.findFirst({
            columns: {
                id: true,
                userContextId: true,
                referralCode: true,
                leadPrefix: true,
                dailyToSell: true,
                dailyExperimentalClass: true,
                pixelId: true,
                pixelSecret: true,
                isActive: true,
                createdAt: true,
                updatedAt: true
            },
            with: {
                userContext: {
                    with: {
                        user: {
                            with: {
                                userProfile: {
                                    columns: {
                                        firstName: true,
                                        lastName: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where(fields, { and, eq, isNull }) {
                return and(eq(fields.id, id), isNull(fields.deletedAt))
            }
        })

        if (!result) {
            throw new ApplicationError('commonNotFound')
        }

        return result
    })

export type GetSellerByIdQuery = Awaited<ReturnType<typeof getSellerByIdQuery>>
