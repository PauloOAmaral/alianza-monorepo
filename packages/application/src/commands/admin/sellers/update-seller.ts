import { createMainDbClient } from '@alianza/database/clients/main'
import { eq } from '@alianza/database/drizzle'
import { sellers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    id: z.string().min(1),
    isActive: z.boolean().optional(),
    referralCode: z.string().min(1).max(10).optional(),
    leadPrefix: z.string().min(1).max(2).optional(),
    dailyToSell: z.coerce.number().min(0).optional().nullable(),
    dailyExperimentalClass: z.coerce.number().int().min(0).optional().nullable(),
    pixelId: z.string().max(500).optional().nullable(),
    pixelSecret: z.string().max(500).optional().nullable()
})

export const updateSellerCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id, isActive, referralCode, leadPrefix, dailyToSell, dailyExperimentalClass, pixelId, pixelSecret } = data

        const db = createMainDbClient()

        const existing = await db.query.sellers.findFirst({
            columns: { id: true },
            where(fields, { and, eq, isNull }) {
                return and(eq(fields.id, id), isNull(fields.deletedAt))
            }
        })

        if (!existing) {
            throw new ApplicationError('commonNotFound')
        }

        const updatePayload: Partial<{
            isActive: boolean
            referralCode: string
            leadPrefix: string
            dailyToSell: string | null
            dailyExperimentalClass: number | null
            pixelId: string | null
            pixelSecret: string | null
            updatedAt: Date
        }> = { updatedAt: new Date() }

        if (isActive !== undefined) updatePayload.isActive = isActive
        if (referralCode !== undefined) updatePayload.referralCode = referralCode
        if (leadPrefix !== undefined) updatePayload.leadPrefix = leadPrefix
        if (dailyToSell !== undefined) updatePayload.dailyToSell = dailyToSell === null ? null : String(dailyToSell)
        if (dailyExperimentalClass !== undefined) updatePayload.dailyExperimentalClass = dailyExperimentalClass
        if (pixelId !== undefined) updatePayload.pixelId = pixelId
        if (pixelSecret !== undefined) updatePayload.pixelSecret = pixelSecret

        await db.update(sellers).set(updatePayload).where(eq(sellers.id, id))
    })

export type UpdateSellerCommandResult = Awaited<ReturnType<typeof updateSellerCommand>>['data']
