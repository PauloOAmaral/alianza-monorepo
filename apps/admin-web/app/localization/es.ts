import { es as esApplication } from '@alianza/application/localization'
import { authES } from './translations/auth'
import { leadsES } from './translations/leads'

export const es = {
    ariaLabels: {
        profileMenu: 'Menú de perfil'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {},
    permissions: {},
    fields: {
        leads: leadsES.fields,
        auth: authES.fields,
    },
    tablePages: {
        leads: leadsES.tablePages,
    },
    formPages: {
        leads: leadsES.formPages,
        login: authES.formPages,
    },
    dialogs: {
        leads: leadsES.dialogs,
    },
    tables: esApplication.tables,
    pagination: esApplication.pagination,
    links: {},
    buttons: esApplication.buttons,
    alerts: {},
    logout: esApplication.logout,
    errors: esApplication.errors,
    languages: esApplication.languages,
    dates: esApplication.dates,
    duration: esApplication.duration,
    enums: esApplication.enums,

}
