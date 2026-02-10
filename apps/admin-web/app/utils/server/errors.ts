import type { ApplicationError } from '@alianza/application/error'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'

export async function parseApplicationError(error: ApplicationError<'base' | 'common' | 'auth'>, request: Request): Promise<string> {
    const i18n = await getI18nextServerInstance(request)
    const { t } = i18n

    const errorCodes = Array.isArray(error.codes) ? error.codes : [error.codes]

    console.log(errorCodes)

    return errorCodes
        .map(code => {
            try {
                return t(`errors.${code}`)
            } catch {
                return t('errors.serverError.unexpected')
            }
        })
        .join('\n')
}
