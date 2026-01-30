import type { NeonDatabase, NeonQueryResultHKT } from 'drizzle-orm/neon-serverless'
import type { PgAsyncTransaction } from 'drizzle-orm/pg-core'
import type * as schema from '../../drizzle/schemas/common'

export type DatabaseClient = NeonDatabase<typeof schema>
export type DatabaseTransaction = PgAsyncTransaction<NeonQueryResultHKT, any, any>

export type AuthDatabaseClient = NeonDatabase<typeof schema>
export type AuthDatabaseTransaction = Parameters<Parameters<AuthDatabaseClient['transaction']>[0]>[0]
