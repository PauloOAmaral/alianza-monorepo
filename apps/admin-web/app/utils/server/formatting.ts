import { format } from 'date-fns'

/**
 * Substitui os X no formato AAAAXXXXXX pelo ID fornecido.
 *
 * @param registrationCode - Código de registro no formato AAAAXXXXXX (onde AAAA são letras e XXXXXX são X a serem substituídos)
 * @param instanceId - ID da instância que substituirá os X
 * @returns O código de registro com os X substituídos pelo ID, ou o código original se não corresponder ao formato esperado
 *
 * @example
 * replaceRegistrationCodePlaceholder("AAAAXXXXXX", "12345") // "AAAA012345"
 * replaceRegistrationCodePlaceholder("TESTXXXXXX", "1") // "TEST000001"
 * replaceRegistrationCodePlaceholder("INVALID", "123") // "INVALID"
 */
export function replaceRegistrationCodePlaceholder(instanceId: string | number): string | undefined {
    const date = new Date()

    const registrationCode = `${format(date, 'yyyy')}XXXXXX`

    const instanceIdStr = instanceId.toString().padStart(6, '0')

    return registrationCode.replace(/X{6}/i, instanceIdStr)
}
