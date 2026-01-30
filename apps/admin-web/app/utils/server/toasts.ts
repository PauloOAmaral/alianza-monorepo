import { dataWithError as dataWithErrorToast, dataWithSuccess as dataWithSuccessToast, redirectWithError as redirectWithErrorToast, redirectWithSuccess as redirectWithSuccessToast } from 'remix-toast'

export async function dataWithSuccess<T>(data: T, toastMessage: string, init?: ResponseInit) {
    return await dataWithSuccessToast(data, toastMessage, init)
}

export async function dataWithError<T>(data: T, toastMessage: string | string[], init?: ResponseInit) {
    const message = Array.isArray(toastMessage) ? toastMessage.join('. ') : toastMessage

    return await dataWithErrorToast(data, message, init)
}

export async function redirectWithSuccess(url: string, toastMessage: string) {
    return await redirectWithSuccessToast(url, toastMessage)
}

export async function redirectWithError(url: string, toastMessage: string) {
    return await redirectWithErrorToast(url, toastMessage)
}
