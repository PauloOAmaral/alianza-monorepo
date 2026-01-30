import type { pt } from "./localization"

type ErrorCategories = {
    base: keyof typeof pt.errors.base
    auth: keyof typeof pt.errors.auth
    common: keyof typeof pt.errors.common
}

export type ErrorCategory = keyof ErrorCategories

export type ErrorCode<T extends ErrorCategory = ErrorCategory> = ErrorCategories[T]

export class ApplicationError<T extends ErrorCategory = ErrorCategory> extends Error {
    public codes: ErrorCode<T>[]

    constructor(code: ErrorCode<T> | ErrorCode<T>[], message?: string) {
        super()
        this.name = "ApplicationError"
        this.codes = Array.isArray(code) ? code : [code]

        if (message) {
            this.message = message
        }
    }
}
