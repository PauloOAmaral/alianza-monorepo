import * as mainSchema from "../../drizzle/schemas"
import { ENV } from "../utils/env"
import { createDbClient } from "./base"

interface CreateMainDbClientOptions {
    usePool?: boolean
}

export const createMainDbClient = (
    options: CreateMainDbClientOptions = {
        usePool: true,
    },
) => {
    return createDbClient(mainSchema, {
        connectionString: options.usePool
            ? ENV.MAIN_POOL_DATABASE_URL
            : ENV.MAIN_DIRECT_DATABASE_URL,
    })
}
