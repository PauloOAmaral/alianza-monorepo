import { createMainDbClient } from '@alianza/database/clients/main'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    id: z.string().min(1)
})

export const getLeadByIdQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id } = data

        const db = createMainDbClient()

        const result = await db.query.leads.findFirst({
            columns: {
                id: true,
                name: true,
                email: true,
                primaryPhoneCountryCode: true,
                primaryPhoneNumber: true,
                leadSource: true,
                internalCampaignId: true,
                status: true,
                sellerId: true,
                companyId: true,
                disciplineId: true,
                secondaryPhoneCountryCode: true,
                secondaryPhoneNumber: true,
                gender: true,
                age: true,
                reason: true,
                eventSourceUrl: true
            },
            where(fields, { eq, isNull, and }) {
                return and(eq(fields.id, id), isNull(fields.deletedAt))
            }
        })

        if (!result) {
            throw new ApplicationError('common_not_found')
        }

        return result
    })

export type GetLeadByIdQuery = Awaited<ReturnType<typeof getLeadByIdQuery>>
