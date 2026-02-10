import { en as enApplication } from '@alianza/application/localization'
import { authEN } from './translations/auth'
import { collectorsEN } from './translations/collectors'
import { leadsEN } from './translations/leads'
import { sellersEN } from './translations/sellers'
import { usersEN } from './translations/users'

export const en = {
    ariaLabels: {
        profileMenu: 'Profile menu'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {
        account: 'My account',
        comercial: 'Commercial',
        collectors: 'Collectors',
        leads: 'Leads',
        sellers: 'Sellers',
        sistema: 'System',
        users: 'Users'
    },
    permissions: {},
    fields: {
        leads: leadsEN.fields,
        auth: authEN.fields,
        sellers: sellersEN.fields,
        users: usersEN.fields
    },
    tablePages: {
        collectors: collectorsEN.tablePages,
        leads: leadsEN.tablePages,
        sellers: sellersEN.tablePages,
        users: usersEN.tablePages
    },
    formPages: {
        account: { title: 'My account', profile: 'Profile' },
        collectors: collectorsEN.formPages,
        leads: leadsEN.formPages,
        login: authEN.formPages,
        sellers: sellersEN.formPages,
        users: usersEN.formPages
    },
    dialogs: {
        leads: leadsEN.dialogs,
        sellers: sellersEN.dialogs,
        users: usersEN.dialogs,
        activate: enApplication.dialogs.activate,
        deactivate: enApplication.dialogs.deactivate,
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
