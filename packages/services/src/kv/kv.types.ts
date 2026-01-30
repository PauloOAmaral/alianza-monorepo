// Redis-like storage interface that doesn't depend on Cloudflare types
export interface RedisStorage {
    get(key: string): Promise<string | null>
    set(key: string, value: string, options?: { expirationTtl?: number }): Promise<string>
    delete(key: string): Promise<number>
    has(key: string): Promise<number>
}
