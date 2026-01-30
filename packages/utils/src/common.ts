type Success<T> = {
    data: T
    error: null
}

type Failure<E> = {
    data: null
    error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

export async function tryCatch<T, E = Error>(promise: Promise<T> | T): Promise<Result<T, E>> {
    try {
        const data = promise instanceof Promise ? await promise : promise

        return { data, error: null }
    } catch (error) {
        return { data: null, error: error as E }
    }
}

export function maskCPF(cpf: string | null | undefined): string | null | undefined {
    if (!cpf) {
        return
    }

    const digits = cpf.replace(/\D/g, '')

    if (digits.length !== 11) {
        return cpf
    }

    return `***.${digits.substring(3, 6)}.***-${digits.substring(9)}`
}

export function alphanumericSearch(textValue: string, inputValue: string) {
    if (!textValue || !inputValue) {
        return true
    }

    const inputValueWithoutNonAlphanumeric = inputValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')

    const textValueWithoutNonAlphanumeric = textValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')

    return textValueWithoutNonAlphanumeric.includes(inputValueWithoutNonAlphanumeric)
}
