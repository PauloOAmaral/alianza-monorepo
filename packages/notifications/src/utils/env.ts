import z from "zod";

const envSchema = z.object({
    APP_PUBLIC_URL: z.string().default("http://localhost:3000"),
    CDN_BASE_URL: z.string().default("https://alianza-local-images.alianza.com/cdn-cgi/image"),
});

export const ENV = envSchema.parse(process.env);