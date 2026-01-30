import { foreignKey, index, integer, pgTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { students } from './students'

export const studentRanking = pgTable(
    'student_ranking',
    {
        id,
        studentId: varchar('student_id', { length: 16 }).notNull(),
        totalPoints: integer('total_points').notNull(),
        rank: integer('rank'),
        lastCalculatedAt: timestamp('last_calculated_at').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_ranking__rank_idx').on(table.rank),
        index('student_ranking_deleted_at_idx').on(table.deletedAt),
        uniqueIndex('student_ranking__student_id_key').on(table.studentId),
        index('student_ranking__total_points_idx').on(table.totalPoints),
        foreignKey({
            columns: [table.studentId],
            foreignColumns: [students.id],
            name: 'student_ranking_fkey'
        })
    ]
)
