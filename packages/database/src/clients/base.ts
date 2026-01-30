import { neonConfig, Pool } from "@neondatabase/serverless"
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless"
import { WebSocket } from "ws"
import "dotenv/config"

neonConfig.webSocketConstructor = WebSocket
neonConfig.poolQueryViaFetch = true

type Schema = Record<string, unknown>

type CreateDbClientOptions = {
	connectionString?: string
	pool?: Pool
}

export const createDbClient = <TSchema extends Schema>(
	schema: TSchema,
	options: CreateDbClientOptions = {},
): NeonDatabase<TSchema> => {
	if (options.pool) {
		return drizzle({ client: options.pool, schema })
	}

	if (!options.connectionString) {
		throw new Error("Missing database connectionString")
	}

	const client = new Pool({ connectionString: options.connectionString })

	return drizzle({ client, schema })
}
