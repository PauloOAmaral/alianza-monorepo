import z from "zod";

const envSchema = z.object({
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_ACCOUNT_TOKEN: z.string(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_R2_REGION: z.string(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
    CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string(),
    CLOUDFLARE_TURNSTILE_VERIFY_URL: z.string(),
    GOOGLE_PLACES_API_KEY: z.string(),
    RESEND_API_KEY: z.string(),
});

export const ENV = envSchema.parse(process.env);