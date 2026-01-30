import type { AuthDatabaseClient, AuthDatabaseTransaction, DocumentType } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { createTenantCore } from '../_shared'

const createTenantSchema = z.object({
    name: z.string().min(1),
    documentNumber: z.string().optional(),
    documentType: z.custom<DocumentType>().optional(),
    contactFirstName: z.string().optional(),
    contactLastName: z.string().optional(),
    contactEmail: z.string().optional(),
    address: z
        .object({
            externalId: z.string().optional(),
            addressLine1: z.string().optional(),
            addressLine2: z.string().optional(),
            suburb: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string(),
            postalCode: z.string().optional(),
            latitude: z.string().optional(),
            longitude: z.string().optional()
        })
        .optional()
})

export const createTenant = createAction({ schema: createTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const response = await createTenantCore({ data, dbClient, dbTransaction })

        return response.data
    })

export type CreateTenantResult = Awaited<ReturnType<typeof createTenant>>['data']
