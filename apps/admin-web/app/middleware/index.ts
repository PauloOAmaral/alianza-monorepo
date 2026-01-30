import { cookieMiddleware } from './cookie-middleware'
import { i18nextMiddleware } from './i18next-middleware'
import { sessionMiddleware } from './session-middleware'

export const commonMiddlewares = [cookieMiddleware, sessionMiddleware, i18nextMiddleware]
