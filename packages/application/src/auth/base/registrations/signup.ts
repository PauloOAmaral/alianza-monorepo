import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { createUserAndTenant } from './create-user-and-tenant'

const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    tenantName: z.string().min(1)
})

export const signup = createAction({ schema: signupSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, password, firstName, lastName, tenantName } = data

        const result = await createUserAndTenant({
            data: {
                user: {
                    email,
                    password,
                    firstName,
                    lastName
                },
                tenant: {
                    name: tenantName
                }
            },
            dbClient,
            dbTransaction
        })

        if (!result.data) {
            throw new ApplicationError('unexpectedError')
        }

        const { user, tenant } = result.data

        if (!user || !tenant) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            email: user.email,
            firstName: user.userProfile.firstName,
            lastName: user.userProfile.lastName,
            token: user.userTenant.invitationToken
        }
    })

export type SignupResult = Awaited<ReturnType<typeof signup>>['data']
