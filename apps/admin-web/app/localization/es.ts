import { es as esApplication } from '@alianza/application/localization'
import { authES } from './translations/auth'
import { leadsES } from './translations/leads'
import { sellersES } from './translations/sellers'

export const es = {
    ariaLabels: {
        profileMenu: 'Menú de perfil'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {
        comercial: 'Comercial',
        leads: 'Leads',
        sellers: 'Vendedores'
    },
    permissions: {},
    fields: {
        leads: leadsES.fields,
        auth: authES.fields,
        sellers: sellersES.fields
    },
    tablePages: {
        leads: leadsES.tablePages,
        sellers: sellersES.tablePages
    },
    formPages: {
        leads: leadsES.formPages,
        login: authES.formPages,
        sellers: sellersES.formPages
    },
    dialogs: {
        leads: leadsES.dialogs,
        sellers: sellersES.dialogs
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
