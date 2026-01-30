import type { RedisStorage } from './kv.types'

/**
 * A Redis-like storage implementation for Cloudflare KV.
 *
 * This implementation is not fully compliant with the Redis protocol,
 * but it is a good starting point for a Redis-like storage implementation.
 *
 * Compatibility status:
 *
 * get(key)                   ✅
 * set(key, value, options)   ✅
 * delete(key)                ✅
 * has(key)                   ✅
 *
 * @see https://github.com/redis/redis-specifications/blob/master/src/protocol/index.md
 */
export class KVStorage implements RedisStorage {
    constructor(protected kv: KVNamespace) {}

    async has(key: string): Promise<number> {
        const value = await this.kv.get(key)

        return value !== null ? 1 : 0
    }

    async get(key: string): Promise<string | null> {
        return this.kv.get(key)
    }

    async set(key: string, value: string, options?: { expirationTtl?: number }): Promise<string> {
        await this.kv.put(key, value, {
            expirationTtl: options?.expirationTtl
        })

        return 'OK'
    }

    async delete(key: string): Promise<number> {
        const exists = await this.has(key)

        if (exists) {
            await this.kv.delete(key)
            return 1
        }

        return 0
    }
}
