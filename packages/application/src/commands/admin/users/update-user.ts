import { createMainDbClient } from '@alianza/database/clients/main'
import { eq, isNull } from '@alianza/database/drizzle'
import { userProfiles, users } from '@alianza/database/schemas/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    userId: z.string().min(1),
    email: z.string().email().max(255),
    firstName: z.string().max(50).optional().nullable(),
    lastName: z.string().max(100).optional().nullable()
})

export const updateUserCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { userId, email, firstName, lastName } = data

        const db = createMainDbClient()

        const existing = await db.query.users.findFirst({
            columns: { id: true, userProfileId: true },
            where(fields, { and, eq, isNull }) {
                return and(eq(fields.id, userId), isNull(fields.deletedAt))
            }
        })

        if (!existing) {
            throw new ApplicationError('commonNotFound')
        }

        const emailNormalized = email.trim().toLowerCase()

        await db.transaction(async tx => {
            await tx
                .update(users)
                .set({
                    email: emailNormalized,
                    updatedAt: new Date()
                })
                .where(eq(users.id, userId))

            const updateProfile: Partial<typeof userProfiles.$inferInsert> = {
                updatedAt: new Date()
            }
            if (firstName !== undefined) {
                updateProfile.firstName = firstName
            }
            if (lastName !== undefined) {
                updateProfile.lastName = lastName
            }

            await tx.update(userProfiles).set(updateProfile).where(eq(userProfiles.id, existing.userProfileId))
        })
    })

export type UpdateUserCommandResult = Awaited<ReturnType<typeof updateUserCommand>>['data']
