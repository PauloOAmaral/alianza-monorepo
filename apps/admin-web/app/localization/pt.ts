import { pt as ptApplication } from '@alianza/application/localization'
import { authPT } from './translations/auth'
import { leadsPT } from './translations/leads'

export const pt = {
    ariaLabels: {
        profileMenu: 'Menu de perfil'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {},
    permissions: {},
    links: {},
    buttons: ptApplication.buttons,
    alerts: {},
    fields: {
        leads: leadsPT.fields,
        auth: authPT.fields
    },
    tablePages: {
        leads: leadsPT.tablePages
    },
    formPages: {
        leads: leadsPT.formPages,
        login: authPT.formPages,
    },
    dialogs: {
        leads: leadsPT.dialogs
    },
    tables: ptApplication.tables,
    pagination: ptApplication.pagination,
    languages: ptApplication.languages,
    dates: ptApplication.dates,
    duration: ptApplication.duration,
    errors: { ...ptApplication.errors.auth, ...ptApplication.errors.common, ...ptApplication.errors.base },
    enums: ptApplication.enums,
}
