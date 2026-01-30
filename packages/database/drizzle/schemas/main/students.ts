import { boolean, char, foreignKey, index, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { addresses, gender as genderEnum } from '../common'
import { collectors } from './collectors'
import { countries } from './countries'
import { financialResponsibles } from './financial-responsibles'

export const students = pgTable(
    'students',
    {
        id,
        addressId: varchar('address_id', { length: 16 }).notNull(),
        status: integer('status').notNull(),
        collectorId: varchar('collector_id', { length: 16 }),
        financialResponsibleId: varchar('financial_responsible_id', { length: 16 }),
        newClassesInApp: boolean('new_classes_in_app').default(false).notNull(),
        companyId: varchar('company_id', { length: 16 }),
        name: varchar('name', { length: 300 }).notNull(),
        email: varchar('email', { length: 200 }).notNull(),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        profilePicture: varchar('profile_picture', { length: 300 }),
        birthday: timestamp('birthday', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        verificationToken: char('verification_token', { length: 10 }),
        verifiedAt: timestamp('verified_at'),
        primaryPhoneCountryCode: char('primary_phone_country_code', { length: 4 }).notNull(),
        primaryPhoneNumber: char('primary_phone_number', { length: 20 }).notNull(),
        secondaryPhoneCountryCode: char('secondary_phone_country_code', { length: 4 }),
        secondaryPhoneNumber: char('secondary_phone_number', { length: 20 }),
        vatNumber: char('v_a_t_number', { length: 40 }).notNull(),
        documentType: integer('document_type').notNull(),
        gender: genderEnum('gender').notNull(),
        password: varchar('password', { length: 200 }).notNull(),
        passwordResetToken: char('password_reset_token', { length: 10 }),
        passwordResetTokenExpiration: timestamp('password_reset_token_expiration'),
        mobileDeviceToken: varchar('mobile_device_token', { length: 300 }),
        firstAccess: boolean('first_access').notNull(),
        sendNotificationsBlock: boolean('send_notifications_block').default(false).notNull(),
        nationalityId: varchar('nationality_id', { length: 16 }).notNull(),
        customerExtId: varchar('customer_ext_id', { length: 200 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('students__address_id_idx').on(table.addressId),
        index('students__collector_id_idx').on(table.collectorId),
        index('students__company_id_idx').on(table.companyId),
        index('students__financial_responsible_id_idx').on(table.financialResponsibleId),
        index('students__nationality_id_idx').on(table.nationalityId),
        index('students_deleted_at_idx').on(table.deletedAt),
        foreignKey({
            columns: [table.addressId],
            foreignColumns: [addresses.id],
            name: 'students__address_id_fkey'
        }),
        foreignKey({
            columns: [table.collectorId],
            foreignColumns: [collectors.id],
            name: 'students__collector_id_fkey'
        }),
        foreignKey({
            columns: [table.nationalityId],
            foreignColumns: [countries.id],
            name: 'students__nationality_id_fkey'
        }),
        foreignKey({
            columns: [table.financialResponsibleId],
            foreignColumns: [financialResponsibles.id],
            name: 'students__financial_responsible_id_fkey'
        })
    ]
)
