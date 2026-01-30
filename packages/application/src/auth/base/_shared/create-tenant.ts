import { nanoid } from "@alianza/database/nanoid"
import {
    addresses,
    permissionGroups,
    permissionGroupsPermissions,
    tenantProfiles,
    tenants,
} from "@alianza/database/schemas/common"
import type { AuthDatabaseTransaction, DocumentType } from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const createTenantCoreSchema = z.object({
    name: z.string().min(1),
    legalName: z.string().optional(),
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
            longitude: z.string().optional(),
        })
        .optional(),
})

export const createTenantCore = createAction({ schema: createTenantCoreSchema })
    .withData()
    .withDatabase<AuthDatabaseTransaction, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const {
            name,
            legalName,
            documentNumber,
            documentType,
            contactFirstName,
            contactLastName,
            contactEmail,
            address,
        } = data

        const createTenantCoreTransaction = async (transaction: AuthDatabaseTransaction) => {
            let createdAddress: { id: string } | undefined

            if (address) {
                const addressId = nanoid(16)
                ;[createdAddress] = await transaction
                    .insert(addresses)
                    .values({
                        id: addressId,
                        externalId: address.externalId,
                        addressLine1: address.addressLine1,
                        addressLine2: address.addressLine2,
                        suburb: address.suburb,
                        city: address.city,
                        state: address.state,
                        country: address.country,
                        postalCode: address.postalCode,
                        latitude: address.latitude?.toString(),
                        longitude: address.longitude?.toString(),
                    })
                    .returning({ id: addresses.id })

                if (!createdAddress) {
                    throw new ApplicationError("unexpectedError")
                }
            }

            const tenantProfileId = nanoid(16)
            const [createdTenantProfile] = await transaction
                .insert(tenantProfiles)
                .values({
                    id: tenantProfileId,
                    name,
                    legalName,
                    documentNumber,
                    documentType,
                    contactFirstName,
                    contactLastName,
                    contactEmail,
                    addressId: createdAddress?.id,
                })
                .returning({
                    id: tenantProfiles.id,
                    name: tenantProfiles.name,
                    documentNumber: tenantProfiles.documentNumber,
                    documentType: tenantProfiles.documentType,
                    contactFirstName: tenantProfiles.contactFirstName,
                    contactLastName: tenantProfiles.contactLastName,
                    contactEmail: tenantProfiles.contactEmail,
                })

            if (!createdTenantProfile) {
                throw new ApplicationError("unexpectedError")
            }

            const tenantId = nanoid(16)
            const [createdTenant] = await transaction
                .insert(tenants)
                .values({
                    id: tenantId,
                    tenantProfileId: createdTenantProfile.id,
                })
                .returning({ id: tenants.id })

            if (!createdTenant) {
                throw new ApplicationError("unexpectedError")
            }

            const permissionGroupId = nanoid(16)
            const [createdPermissionGroup] = await transaction
                .insert(permissionGroups)
                .values({
                    id: permissionGroupId,
                    name: "Admin",
                    tenantId: createdTenant.id,
                })
                .returning({ id: permissionGroups.id, name: permissionGroups.name })

            if (!createdPermissionGroup) {
                throw new ApplicationError("unexpectedError")
            }

            const [createdPermissionGroupPermission] = await transaction
                .insert(permissionGroupsPermissions)
                .values({
                    id: nanoid(16),
                    permissionGroupId: createdPermissionGroup.id,
                    permission: "full",
                })
                .returning({ id: permissionGroupsPermissions.id })

            if (!createdPermissionGroupPermission) {
                throw new ApplicationError("unexpectedError")
            }

            return {
                ...createdTenant,
                tenantProfile: createdTenantProfile,
                permissionGroup: createdPermissionGroup,
            }
        }

        if (dbClient) {
            return await dbClient.transaction(createTenantCoreTransaction)
        }

        return await createTenantCoreTransaction(dbTransaction!)
    })

export type CreateTenantResult = Awaited<ReturnType<typeof createTenantCore>>["data"]
