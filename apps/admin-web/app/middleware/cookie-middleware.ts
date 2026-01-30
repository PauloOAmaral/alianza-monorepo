import { dequal } from "@alianza/utils/comparer"
import {
    createContext,
    createCookieSessionStorage,
    type MiddlewareFunction,
    type RouterContextProvider,
    type Session,
} from "react-router"
import { ENV } from "~/utils/env"

const cookieStorage = createCookieSessionStorage({
    cookie: {
        name: ENV.COOKIE_NAME,
        httpOnly: true,
        maxAge: Number.parseInt(ENV.COOKIE_MAX_AGE, 10),
        path: "/",
        sameSite: "lax",
        secrets: ENV.COOKIE_SECRET.split(","),
        secure: ENV.NODE_ENV === "production",
    },
})

export const cookieContext = createContext<Session | null>(null)

function getCookie(
    context: Readonly<RouterContextProvider> | RouterContextProvider,
): Session | null {
    return context.get(cookieContext)
}

function shouldDestroyCookie(prev: any, current: any): boolean {
    return prev && !current
}

function shouldCommitCookie(prev: any, current: any): boolean {
    return !dequal(prev, current)
}

const cookieMiddleware: MiddlewareFunction<Response> = async ({ request, context }, next) => {
    const cookie = await cookieStorage.getSession(request.headers.get("Cookie"))

    context.set(cookieContext, cookie)

    const initialData = structuredClone(cookie.data)
    const response = await next()
    const currentData = structuredClone(cookie.data)

    if (shouldDestroyCookie(initialData, currentData)) {
        response.headers.append("Set-Cookie", await cookieStorage.destroySession(cookie))
    } else if (shouldCommitCookie(initialData, currentData)) {
        response.headers.append("Set-Cookie", await cookieStorage.commitSession(cookie))
    }

    return response
}

function setCookieValue(
    context: Readonly<RouterContextProvider> | RouterContextProvider,
    key: string,
    value: string,
    isFlashSession?: boolean,
): void {
    const cookie = getCookie(context)

    if (isFlashSession) {
        cookie?.flash(key, value)
    } else {
        cookie?.set(key, value)
    }
}

function getCookieValue(
    context: Readonly<RouterContextProvider> | RouterContextProvider,
    key: string,
): string | undefined {
    const cookie = getCookie(context)

    return cookie?.get(key)
}

function clearCookieValue(
    context: Readonly<RouterContextProvider> | RouterContextProvider,
    key: string,
): void {
    const cookie = getCookie(context)

    cookie?.unset(key)
}

export { cookieMiddleware, getCookie, getCookieValue, setCookieValue, clearCookieValue }
