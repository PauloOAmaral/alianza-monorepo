import { en as enApplication } from '@alianza/application/localization'
import { authEN } from './translations/auth'
import { leadsEN } from './translations/leads'

export const en = {
    ariaLabels: {
        profileMenu: 'Profile menu'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {},
    permissions: {},
    fields: {
        leads: leadsEN.fields,
        auth: authEN.fields,
    },
    tablePages: {
        leads: leadsEN.tablePages,
    },
    formPages: {
        leads: leadsEN.formPages,
        login: authEN.formPages,
    },
    dialogs: {
        leads: leadsEN.dialogs,
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
