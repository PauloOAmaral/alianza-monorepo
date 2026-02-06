import { relations } from 'drizzle-orm/relations'
import {
    addresses,
    permissionGroups,
    permissionGroupsPermissions,
    termsOfUse,
    termsOfUseAcceptances,
    userContextPermissionGroups,
    userContextRoles,
    userContexts,
    userPasswordReset,
    userProfiles,
    userSessions,
    users
} from './auth'
import { medias } from './medias'

export const addressesRelations = relations(addresses, ({ many }) => ({
    userProfiles: many(userProfiles)
}))

export const mediasRelations = relations(medias, ({ many }) => ({
    userProfiles: many(userProfiles)
}))

export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
    avatar: one(medias, { fields: [userProfiles.avatarId], references: [medias.id] }),
    address: one(addresses, { fields: [userProfiles.addressId], references: [addresses.id] }),
    users: many(users)
}))

export const usersRelations = relations(users, ({ one, many }) => ({
    userProfile: one(userProfiles, { fields: [users.userProfileId], references: [userProfiles.id] }),
    userContexts: many(userContexts)
}))

export const userContextsRelations = relations(userContexts, ({ one, many }) => ({
    user: one(users, { fields: [userContexts.userId], references: [users.id] }),
    userSessions: many(userSessions),
    userPasswordResets: many(userPasswordReset),
    userContextPermissionGroups: many(userContextPermissionGroups),
    userContextRoles: many(userContextRoles),
    termsOfUseAcceptances: many(termsOfUseAcceptances)
}))

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
    userContext: one(userContexts, {
        fields: [userSessions.userContextId],
        references: [userContexts.id]
    }),
    currentContext: one(userContexts, {
        fields: [userSessions.currentContextId],
        references: [userContexts.id]
    })
}))

export const userPasswordResetRelations = relations(userPasswordReset, ({ one }) => ({
    userContext: one(userContexts, {
        fields: [userPasswordReset.userContextId],
        references: [userContexts.id]
    })
}))

export const permissionGroupsRelations = relations(permissionGroups, ({ many }) => ({
    permissions: many(permissionGroupsPermissions),
    userContextPermissionGroups: many(userContextPermissionGroups)
}))

export const permissionGroupsPermissionsRelations = relations(permissionGroupsPermissions, ({ one }) => ({
    permissionGroup: one(permissionGroups, {
        fields: [permissionGroupsPermissions.permissionGroupId],
        references: [permissionGroups.id]
    })
}))

export const userContextPermissionGroupsRelations = relations(userContextPermissionGroups, ({ one }) => ({
    userContext: one(userContexts, {
        fields: [userContextPermissionGroups.userContextId],
        references: [userContexts.id]
    }),
    permissionGroup: one(permissionGroups, {
        fields: [userContextPermissionGroups.permissionGroupId],
        references: [permissionGroups.id]
    })
}))

export const termsOfUseRelations = relations(termsOfUse, ({ many }) => ({
    acceptances: many(termsOfUseAcceptances)
}))

export const termsOfUseAcceptancesRelations = relations(termsOfUseAcceptances, ({ one }) => ({
    userContext: one(userContexts, {
        fields: [termsOfUseAcceptances.userContextId],
        references: [userContexts.id]
    }),
    termsOfUse: one(termsOfUse, {
        fields: [termsOfUseAcceptances.termsOfUseId],
        references: [termsOfUse.id]
    })
}))

export const userContextRolesRelations = relations(userContextRoles, ({ one }) => ({
    userContext: one(userContexts, {
        fields: [userContextRoles.userContextId],
        references: [userContexts.id]
    })
}))
