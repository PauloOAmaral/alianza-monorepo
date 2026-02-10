import { es as esApplication } from '@alianza/application/localization'
import { authES } from './translations/auth'
import { collectorsES } from './translations/collectors'
import { leadsES } from './translations/leads'
import { sellersES } from './translations/sellers'
import { usersES } from './translations/users'

export const es = {
    ariaLabels: {
        profileMenu: 'Menú de perfil'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {
        account: 'Mi cuenta',
        comercial: 'Comercial',
        collectors: 'Cobradores',
        leads: 'Leads',
        sellers: 'Vendedores',
        sistema: 'Sistema',
        users: 'Usuarios'
    },
    permissions: {},
    fields: {
        leads: leadsES.fields,
        auth: authES.fields,
        sellers: sellersES.fields,
        users: usersES.fields
    },
    tablePages: {
        collectors: collectorsES.tablePages,
        leads: leadsES.tablePages,
        sellers: sellersES.tablePages,
        users: usersES.tablePages
    },
    formPages: {
        account: { title: 'Mi cuenta', profile: 'Perfil' },
        collectors: collectorsES.formPages,
        leads: leadsES.formPages,
        login: authES.formPages,
        sellers: sellersES.formPages,
        users: usersES.formPages
    },
    dialogs: {
        leads: leadsES.dialogs,
        sellers: sellersES.dialogs,
        users: usersES.dialogs,
        activate: esApplication.dialogs.activate,
        deactivate: esApplication.dialogs.deactivate,
    },
    tables: esApplication.tables,
    pagination: esApplication.pagination,
    links: {},
    buttons: esApplication.buttons,
    alerts: {},
    logout: esApplication.logout,
    errors: { ...esApplication.errors.auth, ...esApplication.errors.common, ...esApplication.errors.base },
    languages: esApplication.languages,
    dates: esApplication.dates,
    duration: esApplication.duration,
    enums: esApplication.enums,

}
