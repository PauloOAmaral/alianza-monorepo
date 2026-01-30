import z from 'zod'

const envSchema = z.object({
    APP_EMAIL_FROM: z.string(),
    APP_PUBLIC_URL: z.string(),
    APP_SUPPORT_EMAIL: z.string(),
    CDN_BASE_URL: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_ACCOUNT_TOKEN: z.string(),
    CLOUDFLARE_ENV_LOCAL: z.string(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_R2_BUCKET_ENV: z.string(),
    CLOUDFLARE_R2_REGION: z.string(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
    CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string(),
    CLOUDFLARE_TURNSTILE_SITE_KEY: z.string(),
    CLOUDFLARE_TURNSTILE_VERIFY_URL: z.string(),
    COOKIE_MAX_AGE: z.string(),
    COOKIE_NAME: z.string(),
    COOKIE_SECRET: z.string(),
    DATABASE_URL: z.string(),
    MAIN_POOL_DATABASE_URL: z.string(),
    MAIN_DIRECT_DATABASE_URL: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    GOOGLE_PLACES_API_KEY: z.string(),
    GOOGLE_PLACES_PROJECT_ID: z.string(),
    I18NEXT_COOKIE_NAME: z.string(),
    SESSION_MAX_AGE: z.string(),
    SESSION_CACHE_TTL: z.string(),
    SESSION_NAME: z.string(),
    SESSION_SECRET: z.string(),
    SESSION_REFRESH_THRESHOLD: z.string(),
    SESSION_EXPIRATION: z.string(),
    TOKEN_ENCRYPTION_KEY: z.string(),
    VALUE_FROM_CLOUDFLARE: z.string()
})

export const ENV = envSchema.parse(process.env)
