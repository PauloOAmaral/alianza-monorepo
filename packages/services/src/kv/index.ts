import { env } from 'cloudflare:workers'
import { KVStorage } from './cloudflare-kv'
import type { RedisStorage } from './kv.types'

type KV = {
    SESSIONS_KV?: KVNamespace
    RATE_LIMIT_KV?: KVNamespace
}

const kv = env as unknown as KV

export const getSessionsKv = (): RedisStorage => {
    if (!kv.SESSIONS_KV) {
        throw new Error('SESSIONS_KV binding is not configured in wrangler.jsonc')
    }

    return new KVStorage(kv.SESSIONS_KV)
}

export const getRateLimitKv = (): RedisStorage => {
    if (!kv.RATE_LIMIT_KV) {
        throw new Error('RATE_LIMIT_KV binding is not configured in wrangler.jsonc')
    }

    return new KVStorage(kv.RATE_LIMIT_KV)
}
