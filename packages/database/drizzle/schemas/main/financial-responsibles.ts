import { boolean, char, foreignKey, index, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'
import { addresses, gender as genderEnum } from '../common'
import { countries } from './countries'

export const financialResponsibles = pgTable(
    'financial_responsibles',
    {
        id,
        isActive,
        addressId: varchar('address_id', { length: 16 }).notNull(),
        name: varchar('name', { length: 300 }).notNull(),
        email: varchar('email', { length: 200 }).notNull(),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        profilePicture: varchar('profile_picture', { length: 350 }),
        birthday: timestamp('birthday').notNull(),
        verificationToken: char('verification_token', { length: 10 }),
        verifiedAt: timestamp('verified_at'),
        primaryPhoneCountryCode: char('primary_phone_country_code', { length: 4 }).notNull(),
        primaryPhoneNumber: char('primary_phone_number', { length: 20 }).notNull(),
        secondaryPhoneCountryCode: char('secondary_phone_country_code', { length: 4 }),
        secondaryPhoneNumber: char('secondary_phone_number', { length: 20 }),
        vatNumber: char('vat_number', { length: 40 }).notNull(),
        documentType: integer('document_type').notNull(),
        gender: genderEnum('gender').notNull(),
        password: varchar('password', { length: 200 }).notNull(),
        passwordResetToken: char('password_reset_token', { length: 10 }),
        passwordResetTokenExpiration: timestamp('password_reset_token_expiration'),
        mobileDeviceToken: varchar('mobile_device_token', { length: 300 }),
        firstAccess: boolean('first_access').notNull(),
        sendNotificationsBlock: boolean('send_notifications_block').notNull(),
        nationalityId: varchar('nationality_id', { length: 16 }).notNull(),
        customerExtId: varchar('customer_ext_id', { length: 200 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('financial_responsibles__address_id_idx').on(table.addressId),
        index('financial_responsibles__nationality_id_idx').on(table.nationalityId),
        foreignKey({
            columns: [table.addressId],
            foreignColumns: [addresses.id],
            name: 'financial_responsibles__address_id_fkey'
        }),
        foreignKey({
            columns: [table.nationalityId],
            foreignColumns: [countries.id],
            name: 'financial_responsibles__nationality_id_fkey'
        })
    ]
)
