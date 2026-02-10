import { createMainDbClient } from '@alianza/database/clients/main'
import { nanoid } from '@alianza/database/nanoid'
import { sellers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    userContextId: z.string().min(1)
})

export const createSellerCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { userContextId } = data

        const db = createMainDbClient()

        const existing = await db.query.sellers.findFirst({
            columns: { id: true },
            where(fields, { eq, isNull, and }) {
                return and(eq(fields.userContextId, userContextId), isNull(fields.deletedAt))
            }
        })

        if (existing) {
            throw new ApplicationError('commonAlreadyExists')
        }

        const referralCode = nanoid(8)
        const leadPrefix = nanoid(2)

        const [created] = await db
            .insert(sellers)
            .values({
                userContextId,
                referralCode,
                leadPrefix,
                isActive: true
            })
            .returning({ id: sellers.id })

        if (!created) {
            throw new ApplicationError('unexpectedError')
        }

        return { sellerId: created.id }
    })

export type CreateSellerCommandResult = Awaited<ReturnType<typeof createSellerCommand>>['data']
