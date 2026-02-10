import { en as enApplication } from '@alianza/application/localization'
import { authEN } from './translations/auth'
import { leadsEN } from './translations/leads'
import { sellersEN } from './translations/sellers'

export const en = {
    ariaLabels: {
        profileMenu: 'Profile menu'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {
        comercial: 'Commercial',
        leads: 'Leads',
        sellers: 'Sellers'
    },
    permissions: {},
    fields: {
        leads: leadsEN.fields,
        auth: authEN.fields,
        sellers: sellersEN.fields
    },
    tablePages: {
        leads: leadsEN.tablePages,
        sellers: sellersEN.tablePages
    },
    formPages: {
        leads: leadsEN.formPages,
        login: authEN.formPages,
        sellers: sellersEN.formPages
    },
    dialogs: {
        leads: leadsEN.dialogs,
        sellers: sellersEN.dialogs
    },
    links: {},
    buttons: enApplication.buttons,
    alerts: {},
    tables: enApplication.tables,
    pagination: enApplication.pagination,
    errors: { ...enApplication.errors.auth, ...enApplication.errors.common, ...enApplication.errors.base },
    logout: enApplication.logout,
    languages: enApplication.languages,
    dates: enApplication.dates,
    duration: enApplication.duration,
    enums: enApplication.enums,
}
