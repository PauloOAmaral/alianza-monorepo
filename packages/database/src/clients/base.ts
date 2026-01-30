import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import type { Pool } from "pg"
import "dotenv/config"

type Schema = Record<string, unknown>

type CreateDbClientOptions = {
	connectionString?: string
	connection?: Pool
	usePool?: boolean
}

export const createDbClient = <TSchema extends Schema>(
	schema: TSchema,
	options: CreateDbClientOptions = {},
): NodePgDatabase<TSchema> => {
	if (options.connection) {
		return drizzle({ client: options.connection, schema })
	}

	if (!options.connectionString) {
		throw new Error("Missing database connectionString")
	}

	return drizzle({
		connection: {
			connectionString: options.connectionString,
			max: options.usePool === false ? 5 : 50,
		},
		schema,
	})
}
