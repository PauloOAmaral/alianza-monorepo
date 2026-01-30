import { getSession as getDatabaseSession, type UserSession } from "@alianza/application/auth/admin"
import {
    createContext,
    createCookieSessionStorage,
    href,
    type MiddlewareFunction,
    type RouterContextProvider,
    redirect,
    type Session,
} from "react-router"
import { ENV } from "~/utils/env"
import { createRequest } from "~/utils/server/request-builder"
import { setCookieValue } from "./cookie-middleware"

type CookieSession = { id: string }

const sessionStorage = createCookieSessionStorage<CookieSession>({
    cookie: {
        name: ENV.SESSION_NAME,
        httpOnly: true,
        maxAge: Number.parseInt(ENV.SESSION_MAX_AGE, 10),
        path: "/",
        sameSite: "lax",
        secrets: ENV.SESSION_SECRET.split(","),
        secure: ENV.NODE_ENV === "production",
    },
})

const cookieSessionContext = createContext<Session<CookieSession>>()
const userSessionContext = createContext<UserSession | null>(null)

async function getCookieSession(request: Request): Promise<Session<CookieSession>> {
    return sessionStorage.getSession(request.headers.get("Cookie"))
}


async function getUserSession(
    request: Request,
): Promise<UserSession | null> {
    const cookieSession = await getCookieSession(request)
    const sessionId = cookieSession.get("id")

    if (!sessionId) return null

    const session = await getDatabaseSession(
        createRequest(request, { sessionId }),
    ).catch(() => null)

    return session?.data ?? null
}


function shouldDestroySession(
    prev: Partial<CookieSession> | null | undefined,
    current: Partial<CookieSession> | null | undefined,
): boolean {
    return Boolean(prev?.id && !current?.id)
}

function shouldCommitSession(
    prev: Partial<CookieSession> | null | undefined,
    current: Partial<CookieSession> | null | undefined,
): boolean {
    return prev?.id !== current?.id
}

async function requireSession(request: Request): Promise<UserSession> {
    const userSession = await getUserSession(request)

    if (userSession) return userSession

    const headers = new Headers()

    headers.append(
        "Set-Cookie",
        await sessionStorage.commitSession(
            await getCookieSession(request),
        ),
    )

    throw redirect(href("/login"), { headers })
}


async function createSession(
    request: Request,
    id: string,
): Promise<Headers> {
    const cookieSession = await getCookieSession(request)
    cookieSession.set("id", id)

    const headers = new Headers()

    headers.append(
        "Set-Cookie",
        await sessionStorage.commitSession(cookieSession),
    )

    return headers
}

async function removeSession(request: Request): Promise<Headers> {
    const cookieSession = await getCookieSession(request)
    cookieSession.unset("id")

    const headers = new Headers()
    headers.append(
        "Set-Cookie",
        await sessionStorage.destroySession(cookieSession),
    )

    return headers
}

const sessionMiddleware: MiddlewareFunction<Response> =
    async ({ request }, next) => {
        const cookieSession = await sessionStorage.getSession(
            request.headers.get("Cookie"),
        )

        const initialData = structuredClone(cookieSession.data)
        const response = await next()
        const currentData = structuredClone(cookieSession.data)

        if (shouldDestroySession(initialData, currentData)) {
            response.headers.append(
                "Set-Cookie",
                await sessionStorage.destroySession(cookieSession),
            )
        } else if (shouldCommitSession(initialData, currentData)) {
            response.headers.append(
                "Set-Cookie",
                await sessionStorage.commitSession(cookieSession),
            )
        }

        return response
    }


export {
    sessionMiddleware,
    requireSession,
    createSession,
    removeSession,
    getCookieSession,
    getUserSession,
}
