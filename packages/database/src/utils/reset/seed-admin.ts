import { permissionGroups, permissionGroupsPermissions, tenantProfiles, tenants, userProfiles, users, userTenantPermissionGroups, userTenants } from '../../../drizzle/schemas/common'
import { createMainDbClient } from '../../clients/main'
import { nanoid } from '../../nanoid'

async function seed() {
    console.log('⏳ Seeding Admin database...\n')

    try {
        const db = createMainDbClient({ usePool: false })

        await db.transaction(async tx => {
            const tenantProfileId = '31nj4imh2sib8ezu'
            await tx.insert(tenantProfiles).values({
                id: tenantProfileId,
                name: 'Alianza',
                legalName: 'Alianza',
                website: 'https://alianza.com'
            })

            console.log(`Tenant profile created: ${tenantProfileId}`)

            const tenantId = '19nj4imh2sib8ezu'
            await tx.insert(tenants).values({
                id: tenantId,
                tenantProfileId
            })

            console.log(`Tenant created: ${tenantId}`)

            const userProfileId = '29nj4imh2sib8ezu'
            await tx.insert(userProfiles).values({
                id: userProfileId,
                firstName: 'Admin',
                lastName: 'Alianza'
            })

            console.log(`User profile created: ${userProfileId}`)

            const userId = '49nj4imh2sib8ezu'
            await tx.insert(users).values({
                id: userId,
                email: 'admin@alianza.com',
                emailConfirmed: true,
                emailConfirmedAt: new Date(),
                userProfileId,
                password: '$2a$10$XG0BDfibbszD5eXG1n6MCuPIBF35tbEupX.DETOWXnE1a5yzIt0GO'
            })

            console.log(`User created: ${userId}`)

            const userTenantId = '59nj4imh2sib8ezu'
            await tx.insert(userTenants).values({
                id: userTenantId,
                userId,
                tenantId,
                invitationToken: null,
                invitationExpiresAt: null,
                invitationConfirmedAt: new Date()
            })

            console.log(`User tenant created: ${userTenantId}`)

            const permissionGroupId = '19nj4imh2sib8ezu'
            await tx.insert(permissionGroups).values({
                id: permissionGroupId,
                name: 'Admin',
                tenantId
            })

            console.log(`Permission group created: ${permissionGroupId}`)

            await tx.insert(permissionGroupsPermissions).values({
                id: nanoid(16),
                permissionGroupId,
                permission: 'full'
            })

            console.log('Permission group permission created')

            await tx.insert(userTenantPermissionGroups).values({
                id: nanoid(16),
                userTenantId,
                permissionGroupId
            })

            console.log('User permission group created')

            console.log('✅ Admin database seeded successfully\n')
        })
    } catch (error) {
        console.error('❌ Error seeding Admin database:', error)

        process.exit(1)
    }

    process.exit(0)
}

seed().catch(error => {
    console.error('❌ Error seeding Admin database:', error)

    process.exit(1)
})
