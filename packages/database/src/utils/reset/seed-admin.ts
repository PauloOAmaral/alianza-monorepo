import { permissionGroups, permissionGroupsPermissions, userContextPermissionGroups, userContexts, userProfiles, users } from '../../../drizzle/schemas/common'
import { countries, disciplines } from '../../../drizzle/schemas/main'
import { createMainDbClient } from '../../clients/main'

const LATIN_AMERICAN_COUNTRIES = [
    { name: 'Argentina', nationality: 'Argentina', countryAlpha2Code: 'AR', phoneCountryCode: '54' },
    { name: 'Belize', nationality: 'Belizenha', countryAlpha2Code: 'BZ', phoneCountryCode: '501' },
    { name: 'Bolívia', nationality: 'Boliviana', countryAlpha2Code: 'BO', phoneCountryCode: '591' },
    { name: 'Brasil', nationality: 'Brasileira', countryAlpha2Code: 'BR', phoneCountryCode: '55' },
    { name: 'Chile', nationality: 'Chilena', countryAlpha2Code: 'CL', phoneCountryCode: '56' },
    { name: 'Colômbia', nationality: 'Colombiana', countryAlpha2Code: 'CO', phoneCountryCode: '57' },
    { name: 'Costa Rica', nationality: 'Costarriquenha', countryAlpha2Code: 'CR', phoneCountryCode: '506' },
    { name: 'Cuba', nationality: 'Cubana', countryAlpha2Code: 'CU', phoneCountryCode: '53' },
    { name: 'Equador', nationality: 'Equatoriana', countryAlpha2Code: 'EC', phoneCountryCode: '593' },
    { name: 'El Salvador', nationality: 'Salvadorenha', countryAlpha2Code: 'SV', phoneCountryCode: '503' },
    { name: 'Guatemala', nationality: 'Guatemalteca', countryAlpha2Code: 'GT', phoneCountryCode: '502' },
    { name: 'Guiana', nationality: 'Guianesa', countryAlpha2Code: 'GY', phoneCountryCode: '592' },
    { name: 'Haiti', nationality: 'Haitiana', countryAlpha2Code: 'HT', phoneCountryCode: '509' },
    { name: 'Honduras', nationality: 'Hondurenha', countryAlpha2Code: 'HN', phoneCountryCode: '504' },
    { name: 'México', nationality: 'Mexicana', countryAlpha2Code: 'MX', phoneCountryCode: '52' },
    { name: 'Nicarágua', nationality: 'Nicaraguense', countryAlpha2Code: 'NI', phoneCountryCode: '505' },
    { name: 'Panamá', nationality: 'Panamenha', countryAlpha2Code: 'PA', phoneCountryCode: '507' },
    { name: 'Paraguai', nationality: 'Paraguaia', countryAlpha2Code: 'PY', phoneCountryCode: '595' },
    { name: 'Peru', nationality: 'Peruana', countryAlpha2Code: 'PE', phoneCountryCode: '51' },
    { name: 'República Dominicana', nationality: 'Dominicana', countryAlpha2Code: 'DO', phoneCountryCode: '1' },
    { name: 'Suriname', nationality: 'Surinamesa', countryAlpha2Code: 'SR', phoneCountryCode: '597' },
    { name: 'Trinidad e Tobago', nationality: 'Trinitária', countryAlpha2Code: 'TT', phoneCountryCode: '1' },
    { name: 'Uruguai', nationality: 'Uruguaia', countryAlpha2Code: 'UY', phoneCountryCode: '598' },
    { name: 'Venezuela', nationality: 'Venezuelana', countryAlpha2Code: 'VE', phoneCountryCode: '58' }
] as const

async function seed() {
    console.log('⏳ Seeding Admin database...\n')

    try {
        const db = createMainDbClient({ usePool: false })

        await db.transaction(async tx => {
            const userProfileId = '29nj4imh2sib8ezu'
            await tx
                .insert(userProfiles)
                .values({
                    id: userProfileId,
                    firstName: 'Admin',
                    lastName: 'Alianza'
                })
                .onConflictDoNothing({ target: userProfiles.id })
            console.log(`User profile: ${userProfileId}`)

            const userId = '49nj4imh2sib8ezu'
            await tx
                .insert(users)
                .values({
                    id: userId,
                    email: 'admin@alianza.com',
                    emailConfirmed: true,
                    emailConfirmedAt: new Date(),
                    userProfileId,
                    password: '$2a$10$XG0BDfibbszD5eXG1n6MCuPIBF35tbEupX.DETOWXnE1a5yzIt0GO'
                })
                .onConflictDoNothing({ target: users.id })
            console.log(`User: ${userId}`)

            const userContextId = '59nj4imh2sib8ezu'
            await tx
                .insert(userContexts)
                .values({
                    id: userContextId,
                    userId,
                    invitationToken: null,
                    invitationExpiresAt: null,
                    invitationConfirmedAt: new Date()
                })
                .onConflictDoNothing({ target: userContexts.id })
            console.log(`User context: ${userContextId}`)

            const permissionGroupId = '19nj4imh2sib8ezu'
            await tx
                .insert(permissionGroups)
                .values({
                    id: permissionGroupId,
                    name: 'Admin'
                })
                .onConflictDoNothing({ target: permissionGroups.id })
            console.log(`Permission group: ${permissionGroupId}`)

            const permissionGroupPermissionId = '69nj4imh2sib8ezu'
            await tx
                .insert(permissionGroupsPermissions)
                .values({
                    id: permissionGroupPermissionId,
                    permissionGroupId,
                    permission: 'full'
                })
                .onConflictDoNothing({ target: permissionGroupsPermissions.id })
            console.log('Permission group permission seeded')

            const userContextPermissionGroupId = '79nj4imh2sib8ezu'
            await tx
                .insert(userContextPermissionGroups)
                .values({
                    id: userContextPermissionGroupId,
                    userContextId,
                    permissionGroupId
                })
                .onConflictDoNothing({ target: userContextPermissionGroups.id })
            console.log('User context permission group seeded')

            await tx.insert(disciplines).values({ name: 'Inglês' }).onConflictDoNothing({ target: disciplines.name })
            console.log('Discipline "Inglês" seeded')

            for (const row of LATIN_AMERICAN_COUNTRIES) {
                await tx
                    .insert(countries)
                    .values({
                        name: row.name,
                        nationality: row.nationality,
                        countryAlpha2Code: row.countryAlpha2Code,
                        phoneCountryCode: row.phoneCountryCode
                    })
                    .onConflictDoNothing({ target: countries.name })
            }
            console.log(`${LATIN_AMERICAN_COUNTRIES.length} countries (América Latina) seeded`)

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
