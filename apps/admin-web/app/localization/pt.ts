import { pt as ptApplication } from '@alianza/application/localization'
import { authPT } from './translations/auth'
import { collectorsPT } from './translations/collectors'
import { leadsPT } from './translations/leads'
import { sellersPT } from './translations/sellers'
import { usersPT } from './translations/users'

export const pt = {
    ariaLabels: {
        profileMenu: 'Menu de perfil'
    },
    titles: {
        home: 'Home'
    },
    common: {},
    sidebar: {
        account: 'Minha conta',
        comercial: 'Comercial',
        collectors: 'Cobradores',
        leads: 'Leads',
        sellers: 'Vendedores',
        sistema: 'Sistema',
        users: 'Usuários'
    },
    permissions: {},
    links: {},
    buttons: ptApplication.buttons,
    alerts: {},
    fields: {
        leads: leadsPT.fields,
        auth: authPT.fields,
        sellers: sellersPT.fields,
        users: usersPT.fields
    },
    tablePages: {
        collectors: collectorsPT.tablePages,
        leads: leadsPT.tablePages,
        sellers: sellersPT.tablePages,
        users: usersPT.tablePages
    },
    formPages: {
        account: { title: 'Minha conta', profile: 'Perfil' },
        collectors: collectorsPT.formPages,
        leads: leadsPT.formPages,
        login: authPT.formPages,
        sellers: sellersPT.formPages,
        users: usersPT.formPages
    },
    dialogs: {
        leads: leadsPT.dialogs,
        sellers: sellersPT.dialogs,
        users: usersPT.dialogs,
        activate: ptApplication.dialogs.activate,
        deactivate: ptApplication.dialogs.deactivate,
    },
    tables: ptApplication.tables,
    pagination: ptApplication.pagination,
    languages: ptApplication.languages,
    dates: ptApplication.dates,
    duration: ptApplication.duration,
    errors: { ...ptApplication.errors.auth, ...ptApplication.errors.common, ...ptApplication.errors.base },
    enums: ptApplication.enums,
}
