import { relations } from 'drizzle-orm/_relations'
import {
    addresses,
    permissionGroups,
    permissionGroupsPermissions,
    tenantProfiles,
    tenantRoles,
    tenants,
    termsOfUse,
    termsOfUseAcceptances,
    userPasswordReset,
    userProfiles,
    userSessions,
    users,
    userTenantPermissionGroups,
    userTenants
} from './auth'
import { medias } from './medias'

export const addressesRelations = relations(addresses, ({ many }) => ({
    tenantProfiles: many(tenantProfiles),
    userProfiles: many(userProfiles)
}))

export const mediasRelations = relations(medias, ({ many }) => ({
    tenantProfiles: many(tenantProfiles),
    userProfiles: many(userProfiles)
}))

export const tenantProfilesRelations = relations(tenantProfiles, ({ one, many }) => ({
    avatar: one(medias, { fields: [tenantProfiles.avatarId], references: [medias.id] }),
    address: one(addresses, { fields: [tenantProfiles.addressId], references: [addresses.id] }),
    tenants: many(tenants)
}))

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
    tenantProfile: one(tenantProfiles, {
        fields: [tenants.tenantProfileId],
        references: [tenantProfiles.id]
    }),
    userTenants: many(userTenants),
    userSessionsAsCurrent: many(userSessions),
    permissionGroups: many(permissionGroups),
    tenantRoles: many(tenantRoles)
}))

export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
    avatar: one(medias, { fields: [userProfiles.avatarId], references: [medias.id] }),
    address: one(addresses, { fields: [userProfiles.addressId], references: [addresses.id] }),
    users: many(users)
}))

export const usersRelations = relations(users, ({ one, many }) => ({
    userProfile: one(userProfiles, { fields: [users.userProfileId], references: [userProfiles.id] }),
    userTenants: many(userTenants)
}))

export const userTenantsRelations = relations(userTenants, ({ one, many }) => ({
    user: one(users, { fields: [userTenants.userId], references: [users.id] }),
    tenant: one(tenants, { fields: [userTenants.tenantId], references: [tenants.id] }),
    userSessions: many(userSessions),
    userPasswordResets: many(userPasswordReset),
    userTenantPermissionGroups: many(userTenantPermissionGroups),
    termsOfUseAcceptances: many(termsOfUseAcceptances)
}))

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
    userTenant: one(userTenants, {
        fields: [userSessions.userTenantId],
        references: [userTenants.id]
    }),
    currentTenant: one(tenants, {
        fields: [userSessions.currentTenantId],
        references: [tenants.id]
    })
}))

export const userPasswordResetRelations = relations(userPasswordReset, ({ one }) => ({
    userTenant: one(userTenants, {
        fields: [userPasswordReset.userTenantId],
        references: [userTenants.id]
    })
}))

export const permissionGroupsRelations = relations(permissionGroups, ({ one, many }) => ({
    tenant: one(tenants, { fields: [permissionGroups.tenantId], references: [tenants.id] }),
    permissions: many(permissionGroupsPermissions),
    userTenantPermissionGroups: many(userTenantPermissionGroups)
}))

export const permissionGroupsPermissionsRelations = relations(permissionGroupsPermissions, ({ one }) => ({
    permissionGroup: one(permissionGroups, {
        fields: [permissionGroupsPermissions.permissionGroupId],
        references: [permissionGroups.id]
    })
}))

export const userTenantPermissionGroupsRelations = relations(userTenantPermissionGroups, ({ one }) => ({
    userTenant: one(userTenants, {
        fields: [userTenantPermissionGroups.userTenantId],
        references: [userTenants.id]
    }),
    permissionGroup: one(permissionGroups, {
        fields: [userTenantPermissionGroups.permissionGroupId],
        references: [permissionGroups.id]
    })
}))

export const termsOfUseRelations = relations(termsOfUse, ({ many }) => ({
    acceptances: many(termsOfUseAcceptances)
}))

export const termsOfUseAcceptancesRelations = relations(termsOfUseAcceptances, ({ one }) => ({
    userTenant: one(userTenants, {
        fields: [termsOfUseAcceptances.userTenantId],
        references: [userTenants.id]
    }),
    termsOfUse: one(termsOfUse, {
        fields: [termsOfUseAcceptances.termsOfUseId],
        references: [termsOfUse.id]
    })
}))

export const tenantRolesRelations = relations(tenantRoles, ({ one }) => ({
    tenant: one(tenants, { fields: [tenantRoles.tenantId], references: [tenants.id] })
}))
