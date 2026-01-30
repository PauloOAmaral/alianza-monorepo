import type { NodePgDatabase, NodePgTransaction } from "drizzle-orm/node-postgres"
import type * as schema from "../../drizzle/schemas/common"

export type DatabaseClient = NodePgDatabase
export type DatabaseTransaction = NodePgTransaction<any, any, any>

export type DocumentType = typeof schema.documentType

export type AuthDatabaseClient = NodePgDatabase<typeof schema>
export type AuthDatabaseTransaction = Parameters<
	Parameters<AuthDatabaseClient["transaction"]>[0]
>[0]
