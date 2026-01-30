import { getSessionsKv } from '@alianza/services/kv'

export async function getCachedOrFetch<T>({ sessionId, ttlSeconds, sessionFetchFn }: { sessionId: string; ttlSeconds: number; sessionFetchFn: () => Promise<T> }): Promise<T> {
    const cachedSession = await getSessionsKv().get(sessionId)

    if (cachedSession) {
        return JSON.parse(cachedSession) as T
    }

    const session = await sessionFetchFn()

    await getSessionsKv().set(sessionId, JSON.stringify(session), {
        expirationTtl: ttlSeconds
    })

    return session
}
