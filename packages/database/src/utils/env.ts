import z from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    DATABASE_URL: z.string(),
    MAIN_POOL_DATABASE_URL: z.string(),
    MAIN_DIRECT_DATABASE_URL: z.string()
})

export const ENV = envSchema.parse(process.env)
