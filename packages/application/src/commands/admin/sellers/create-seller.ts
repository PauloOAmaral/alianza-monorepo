import { createMainDbClient } from '@alianza/database/clients/main'
import { nanoid } from '@alianza/database/nanoid'
import { sellers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    userContextId: z.string().min(1),
    referralCode: z.string().min(1).max(10).optional(),
    leadPrefix: z.string().min(1).max(2).optional(),
    dailyToSell: z.coerce.number().min(0).optional().nullable(),
    dailyExperimentalClass: z.coerce.number().int().min(0).optional().nullable(),
    pixelId: z.string().max(500).optional().nullable(),
    pixelSecret: z.string().max(500).optional().nullable()
})

export const createSellerCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const {
            userContextId,
            referralCode: referralCodeInput,
            leadPrefix: leadPrefixInput,
            dailyToSell,
            dailyExperimentalClass,
            pixelId,
            pixelSecret
        } = data

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

        const referralCode = referralCodeInput?.trim() ? referralCodeInput.trim() : nanoid(8)
        const leadPrefix = leadPrefixInput?.trim() ? leadPrefixInput.trim() : nanoid(2)

        const [created] = await db
            .insert(sellers)
            .values({
                userContextId,
                referralCode,
                leadPrefix,
                dailyToSell: dailyToSell ?? null,
                dailyExperimentalClass: dailyExperimentalClass ?? null,
                pixelId: pixelId ?? null,
                pixelSecret: pixelSecret ?? null,
                isActive: true
            })
            .returning({ id: sellers.id })

        if (!created) {
            throw new ApplicationError('unexpectedError')
        }

        return { sellerId: created.id }
    })

export type CreateSellerCommandResult = Awaited<ReturnType<typeof createSellerCommand>>['data']
