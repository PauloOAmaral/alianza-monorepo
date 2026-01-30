export function isCpfValid(cpf: string) {
    const cleanCpf = cpf.replace(/[^\d]/g, '')

    if (cleanCpf.length !== 11) {
        return false
    }

    // Check for known invalid patterns
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
        return false
    }

    // Validate first verification digit
    let sum = 0

    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cleanCpf.charAt(i), 10) * (10 - i)
    }

    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) {
        remainder = 0
    }

    if (remainder !== Number.parseInt(cleanCpf.charAt(9), 10)) {
        return false
    }

    // Validate second verification digit
    sum = 0

    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(cleanCpf.charAt(i), 10) * (11 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
        remainder = 0
    }

    if (remainder !== Number.parseInt(cleanCpf.charAt(10), 10)) {
        return false
    }

    return true
}

export function isCnpjValid(cnpj: string) {
    const cleanCnpj = cnpj.replace(/[^\d]/g, '')

    if (cleanCnpj.length !== 14) {
        return false
    }

    // Check for known invalid patterns
    if (/^(\d)\1{13}$/.test(cleanCnpj)) {
        return false
    }

    // Validate first verification digit
    let size = cleanCnpj.length - 2
    let numbers = cleanCnpj.substring(0, size)
    const digits = cleanCnpj.substring(size)
    let sum = 0
    let pos = size - 7

    for (let i = size; i >= 1; i--) {
        sum += Number.parseInt(numbers.charAt(size - i), 10) * pos--

        if (pos < 2) {
            pos = 9
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    if (result !== Number.parseInt(digits.charAt(0), 10)) {
        return false
    }

    // Validate second verification digit
    size = size + 1
    numbers = cleanCnpj.substring(0, size)
    sum = 0
    pos = size - 7

    for (let i = size; i >= 1; i--) {
        sum += Number.parseInt(numbers.charAt(size - i), 10) * pos--

        if (pos < 2) {
            pos = 9
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    if (result !== Number.parseInt(digits.charAt(1), 10)) {
        return false
    }

    return true
}
