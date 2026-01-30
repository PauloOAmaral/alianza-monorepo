import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
    DocumentType,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"
import { getDomainFromEmail } from "../../utils"
import { addUserToTenantCore, createTenantCore } from "../_shared"

const createUserAndTenantSchema = z.object({
    user: z.object({
        email: z.email(),
        password: z.string().optional(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
    }),
    tenant: z.object({
        name: z.string().min(1),
        documentNumber: z.string().optional(),
        documentType: z.custom<DocumentType>().optional(),
        contactFirstName: z.string().optional(),
        contactLastName: z.string().optional(),
        contactEmail: z.string().optional(),
    }),
})

export const createUserAndTenant = createAction({ schema: createUserAndTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { user, tenant } = data

        const emailDomain = getDomainFromEmail(user.email)

        const createUserAndTenantWithTransaction = async (transaction: AuthDatabaseTransaction) => {
            const domainUsingSaml = await transaction._query.tenantSamlProviders.findFirst({
                columns: {
                    id: true,
                },
                where: (tenantSamlProviders, { eq }) => eq(tenantSamlProviders.domain, emailDomain),
            })

            if (domainUsingSaml) {
                throw new ApplicationError("authDomainConfiguredForSaml")
            }

            const existingUser = await transaction._query.users.findFirst({
                columns: {
                    id: true,
                },
                where: (users, { eq }) => eq(users.email, user.email),
            })

            if (existingUser) {
                throw new ApplicationError("authUserAlreadyExists")
            }

            const createdTenantResponse = await createTenantCore({
                data: tenant,
                dbTransaction: transaction,
            })

            const createdTenant = createdTenantResponse.data

            const createdUserResponse = await addUserToTenantCore({
                data: {
                    email: user.email,
                    tenantId: createdTenant.id,
                    permissionGroupIds: [createdTenant.permissionGroup.id],
                },
                dbTransaction: transaction,
            })

            const createdUser = createdUserResponse.data

            return {
                tenant: createdTenant,
                user: createdUser,
            }
        }

        if (dbClient) {
            return await dbClient.transaction(createUserAndTenantWithTransaction)
        }

        if (!dbTransaction) {
            throw new ApplicationError("databaseNotFound")
        }

        return await createUserAndTenantWithTransaction(dbTransaction)
    })

export type CreateUserAndTenantResult = Awaited<ReturnType<typeof createUserAndTenant>>["data"]
