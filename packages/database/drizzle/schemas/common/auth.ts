import { sql } from "drizzle-orm"
import {
    boolean,
    decimal,
    foreignKey,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { medias } from "./medias"

export const documentType = pgEnum("document_type", ["cpf", "cnpj", "tax_id"])
export const languageType = pgEnum("language_type", ["en", "pt", "es"])
export const userType = pgEnum("user_type", ["student", "teacher", "financial_responsible", "alianza"])

export const studentStatus = pgEnum("student_status", ["active", "inactive", "blocked"])
export const tenantRoleType = pgEnum("tenant_role_type", ["system_admin", "alianza_admin"])

/**
 * Permissions
 * full - Acesso total - Admin
 * _view - Pode visualizar as tabelas e tambem visualizar os detalhes de cada registro individualmente
 * _edit - Pode editar os registros e alterar o status dos registros
 * _create - Pode criar novos registros
 * _delete - Pode deletar registros
 * _import - Pode importar arquivos e gerar cadastros em massa
 */
export const permissionType = pgEnum("permission_type", [
    // Acesso total - Admin
    "full",
    // Cadastro - Usuários
    "users_view",
    "users_edit",
    "users_create",
    "users_delete",
    // Cadastro - Permissões
    "permissions_view",
    "permissions_edit",
    "permissions_create",
    "permissions_delete",
    // Cadastro - Leads
    "lead_view",
    "lead_edit",
    "lead_create",
    "lead_import",
    "lead_delete",
])

export const gender = pgEnum("gender", [
    "unknown", // Não informado = 0
    "masculine", // Masculino = 1
    "feminine", // Feminino = 2
])

export const level = pgEnum("level", [
    "basic_i", // Basic I = 0
    "basic_ii", // Basic II = 1
    "pre_intermediate", // Pre-Intermediate = 2
    "intermediate", // Intermediate = 3
    "upper_intermediate", // Upper-Intermediate = 4
    "advanced", // Advanced = 5
])

export const paymentType = pgEnum("payment_type", [
    "payment_link", // Link de Pagamento = 0
    "bank_transfer", // Transferência Bancária = 1
    "paypal", // PayPal = 2
    "mercado_livre", // Mercado Livre = 3
    "zelle", // Zelle = 4
    "venmo", // Venmo = 5
])

export const addresses = pgTable("addresses", {
    id,
    externalId: text("external_id"),
    addressLine1: text("address_line_1"),
    addressLine2: text("address_line_2"),
    suburb: text("suburb"),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 2 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }),
    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),
    createdAt,
    updatedAt,
})

export const tenants = pgTable(
    "tenants",
    {
        id,
        tenantProfileId: varchar("tenant_profile_id", { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt,
    },
    (table) => [
        foreignKey({
            columns: [table.tenantProfileId],
            foreignColumns: [tenantProfiles.id],
            name: "tenants_tenant_profile_id_fkey",
        }).onDelete("restrict")
    ],
)

export const tenantProfiles = pgTable(
    "tenant_profiles",
    {
        id,
        name: varchar("name", { length: 100 }).notNull(),
        legalName: varchar("legal_name", { length: 100 }),
        website: varchar("website", { length: 255 }),
        avatarId: varchar("avatar_id", { length: 16 }),
        addressId: varchar("address_id", { length: 16 }),
        documentNumber: varchar("document_number", { length: 50 }),
        documentType: documentType("document_type"),
        contactFirstName: varchar("contact_first_name", { length: 100 }),
        contactLastName: varchar("contact_last_name", { length: 100 }),
        contactEmail: varchar("contact_email", { length: 255 }),
        phone: varchar("phone", { length: 50 }),
        createdAt,
        updatedAt,
    },
    (table) => [
        uniqueIndex("tenant_profiles_document_number_type_key").on(
            table.documentNumber,
            table.documentType,
        ),
        foreignKey({
            columns: [table.avatarId],
            foreignColumns: [medias.id],
            name: "tenant_profiles_avatar_id_fkey",
        }).onDelete("set null"),
        foreignKey({
            columns: [table.addressId],
            foreignColumns: [addresses.id],
            name: "tenant_profiles_address_id_fkey",
        }).onDelete("set null"),
    ],
)

export const users = pgTable(
    "users",
    {
        id,
        email: varchar("email", { length: 255 }).notNull(),
        password: varchar("password", { length: 255 }),
        emailConfirmed: boolean("email_confirmed").default(false).notNull(),
        emailConfirmedAt: timestamp("email_confirmed_at", {
            mode: "date",
        }),
        userProfileId: varchar("user_profile_id", { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt,
    },
    (table) => [
        uniqueIndex("users_email_key").on(table.email),
        foreignKey({
            columns: [table.userProfileId],
            foreignColumns: [userProfiles.id],
            name: "users_user_profile_id_fkey",
        }).onDelete("restrict"),
    ],
)

export const userPasswordReset = pgTable(
    "user_password_reset",
    {
        id,
        userId: varchar("user_id", { length: 16 }).notNull(),
        token: varchar("token", { length: 32 }),
        expiresAt: timestamp("expires_at", {
            mode: "date",
        })
            .default(sql`CURRENT_TIMESTAMP + INTERVAL '24 hours'`)
            .notNull(),
        usedAt: timestamp("used_at", {
            mode: "date",
        }),
        userAgent: varchar("user_agent", { length: 255 }),
        ipAddress: varchar("ip_address", { length: 45 }),
        createdAt,
        updatedAt,
    },
    (table) => [
        uniqueIndex("password_reset_token_key").on(table.token),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "password_reset_user_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const userTenants = pgTable(
    "user_tenants",
    {
        id,
        tenantId: varchar("tenant_id", { length: 16 }).notNull(),
        userId: varchar("user_id", { length: 16 }).notNull(),
        invitationToken: varchar("invitation_token", { length: 32 }),
        invitationExpiresAt: timestamp("invitation_expires_at", {
            mode: "date",
        }),
        invitationConfirmedAt: timestamp("invitation_confirmed_at", {
            mode: "date",
        }),
        createdAt,
        updatedAt,
    },
    (table) => [
        uniqueIndex("user_tenants_invitation_token_key").on(table.invitationToken),
        uniqueIndex("user_tenants_user_id_tenant_id_key").on(table.userId, table.tenantId),
        foreignKey({
            columns: [table.tenantId],
            foreignColumns: [tenants.id],
            name: "user_tenants_tenant_id_fkey",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "user_tenants_user_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const userProfiles = pgTable(
    "user_profiles",
    {
        id,
        firstName: varchar("first_name", { length: 50 }),
        lastName: varchar("last_name", { length: 100 }),
        avatarId: varchar("avatar_id", { length: 16 }),
        addressId: varchar("address_id", { length: 16 }),
        documentNumber: varchar("document_number", { length: 50 }),
        documentType: documentType("document_type"),
        createdAt,
        updatedAt,
    },
    (table) => [
        uniqueIndex("user_profiles_document_number_type_key").on(
            table.documentNumber,
            table.documentType,
        ),
        foreignKey({
            columns: [table.avatarId],
            foreignColumns: [medias.id],
            name: "user_profiles_avatar_id_fkey",
        }).onDelete("set null"),
        foreignKey({
            columns: [table.addressId],
            foreignColumns: [addresses.id],
            name: "user_profiles_address_id_fkey",
        }).onDelete("set null"),
    ],
)

export const userSessions = pgTable(
    "user_sessions",
    {
        id,
        userId: varchar("user_id", { length: 16 }).notNull(),
        userAgent: varchar("user_agent", { length: 255 }),
        ipAddress: varchar("ip_address", { length: 45 }),
        expiresAt: timestamp("expires_at", {
            mode: "date",
        }).notNull(),
        createdAt,
        updatedAt,
        currentTenantId: varchar("current_tenant_id", { length: 16 }).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "user_sessions_user_id_fkey",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.currentTenantId],
            foreignColumns: [tenants.id],
            name: "user_sessions_current_tenant_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const permissionGroups = pgTable(
    "permission_groups",
    {
        id,
        name: varchar("name", { length: 100 }).notNull(),
        tenantId: varchar("tenant_id", { length: 16 }).notNull(),
        createdAt,
        updatedAt,
    },
    (table) => [
        uniqueIndex("permission_groups_tenant_id_name_key").on(table.tenantId, table.name),
        foreignKey({
            columns: [table.tenantId],
            foreignColumns: [tenants.id],
            name: "permission_groups_tenant_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const permissionGroupsPermissions = pgTable(
    "permission_groups_permissions",
    {
        id,
        permissionGroupId: varchar("permission_group_id", { length: 16 }).notNull(),
        permission: permissionType("permission").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.permissionGroupId],
            foreignColumns: [permissionGroups.id],
            name: "permission_groups_permissions_permission_group_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const userTenantPermissionGroups = pgTable(
    "user_tenant_permission_groups",
    {
        id,
        userTenantId: varchar("user_tenant_id", { length: 16 }).notNull(),
        permissionGroupId: varchar("permission_group_id", { length: 16 }).notNull(),
        createdAt,
    },
    (table) => [
        uniqueIndex("utpg_user_tenant_permission_group_uk").on(
            table.userTenantId,
            table.permissionGroupId,
        ),
        foreignKey({
            columns: [table.userTenantId],
            foreignColumns: [userTenants.id],
            name: "user_tenant_permission_groups_user_tenant_id_fkey",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.permissionGroupId],
            foreignColumns: [permissionGroups.id],
            name: "user_tenant_permission_groups_permission_group_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const termsOfUse = pgTable(
    "terms_of_use",
    {
        id,
        version: varchar("version", { length: 50 }).notNull(),
        language: languageType("language").notNull(),
        content: text("content").notNull(),
        createdAt,
        updatedAt,
    },
    (table) => [uniqueIndex("terms_of_use_version_language_key").on(table.version, table.language)],
)

export const termsOfUseAcceptances = pgTable(
    "terms_of_use_acceptances",
    {
        id,
        userId: varchar("user_id", { length: 16 }).notNull(),
        termsOfUseId: varchar("terms_of_use_id", { length: 16 }).notNull(),
        userAgent: varchar("user_agent", { length: 255 }),
        ipAddress: varchar("ip_address", { length: 45 }),
        createdAt,
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "terms_of_use_acceptances_user_id_fkey",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.termsOfUseId],
            foreignColumns: [termsOfUse.id],
            name: "terms_of_use_acceptances_terms_of_use_id_fkey",
        }).onDelete("cascade"),
    ],
)

export const tenantRoles = pgTable(
    "tenant_roles",
    {
        id,
        role: tenantRoleType("role").notNull(),
        tenantId: varchar("tenant_id", { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        isActive,
        deletedAt,
    },
    (table) => [
        uniqueIndex("tenant_roles_role_tenant_id_key").using(
            "btree",
            table.role.asc().nullsLast(),
            table.tenantId.asc().nullsLast(),
        ),
        foreignKey({
            columns: [table.tenantId],
            foreignColumns: [tenants.id],
            name: "tenant_roles_tenant_id_fkey",
        }).onDelete("cascade"),
    ],
)