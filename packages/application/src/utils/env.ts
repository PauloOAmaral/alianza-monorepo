import z from "zod";

const envSchema = z.object({
    APP_EMAIL_FROM: z.string(),
    CDN_BASE_URL: z.string(),
    SESSION_CACHE_TTL: z.string(),
    SESSION_EXPIRATION: z.string(),
    SESSION_REFRESH_THRESHOLD: z.string(),
});

export const ENV = envSchema.parse(process.env);