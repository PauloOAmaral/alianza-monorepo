import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, isNull } from '@alianza/database/drizzle'
import { users } from '@alianza/database/schemas/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    id: z.string().min(1)
})

export const getUserByIdQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id } = data

        const db = createMainDbClient()

        const result = await db.query.users.findFirst({
            columns: {
                id: true,
                email: true,
                emailConfirmed: true,
                userProfileId: true,
                createdAt: true,
                updatedAt: true
            },
            with: {
                userProfile: {
                    columns: {
                        id: true,
                        firstName: true,
                        lastName: true
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

export type GetUserByIdQuery = Awaited<ReturnType<typeof getUserByIdQuery>>
