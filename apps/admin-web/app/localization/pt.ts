import { pt as ptApplication } from '@alianza/application/localization'
import { authPT } from './translations/auth'
import { leadsPT } from './translations/leads'
import { sellersPT } from './translations/sellers'

export const pt = {
    ariaLabels: {
        profileMenu: 'Menu de perfil'
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
    links: {},
    buttons: ptApplication.buttons,
    alerts: {},
    fields: {
        leads: leadsPT.fields,
        auth: authPT.fields,
        sellers: sellersPT.fields
    },
    tablePages: {
        leads: leadsPT.tablePages,
        sellers: sellersPT.tablePages
    },
    formPages: {
        leads: leadsPT.formPages,
        login: authPT.formPages,
        sellers: sellersPT.formPages
    },
    dialogs: {
        leads: leadsPT.dialogs,
        sellers: sellersPT.dialogs
    },
    tables: ptApplication.tables,
    pagination: ptApplication.pagination,
    languages: ptApplication.languages,
    dates: ptApplication.dates,
    duration: ptApplication.duration,
    errors: { ...ptApplication.errors.auth, ...ptApplication.errors.common, ...ptApplication.errors.base },
    enums: ptApplication.enums,
}
