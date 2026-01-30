import {
	boolean,
	decimal,
	foreignKey,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { level as levelEnum } from "../common"
import { dataContracts } from "./data-contracts"
import { disciplines } from "./disciplines"
import { teacherContractModels } from "./teacher-contract-models"
import { teachers } from "./teachers"

export const teacherType = pgEnum("teacher_type", [
	"all", // Experimental e Efetivo = 0
	"experimental", // Experimental = 1
	"effective", // Efetivo = 2
])

export const teacherContracts = pgTable(
	"teacher_contracts",
	{
		id,
		teacherId: varchar("teacher_id", { length: 16 }).notNull(),
		disciplineId: varchar("discipline_id", { length: 16 }).notNull(),
		teacherContractModelId: varchar("teacher_contract_model_id", { length: 16 }),
		studentValue: decimal("student_value", { precision: 18, scale: 2 }).notNull(),
		studentNativeValue: decimal("student_native_value", { precision: 18, scale: 2 }).notNull(),
		level: levelEnum("level").notNull(),
		signStatus: integer("sign_status").notNull(),
		teacherType: teacherType("teacher_type").notNull(),
		dataContractId: varchar("data_contract_id", { length: 16 }),
		signDate: timestamp("sign_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		endAt: timestamp("end_at", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		signDocumentLink: text("sign_document_link"),
		isNative: boolean("is_native").notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("teacher_contracts__data_contract_id_idx").on(table.dataContractId),
		index("teacher_contracts__discipline_id_idx").on(table.disciplineId),
		index("teacher_contracts_deleted_at_idx").on(table.deletedAt),
		index("teacher_contracts__teacher_contract_model_id_idx").on(table.teacherContractModelId),
		index("teacher_contracts__teacher_id_idx").on(table.teacherId),
		foreignKey({
			columns: [table.dataContractId],
			foreignColumns: [dataContracts.id],
			name: "teacher_contracts__data_contract_id_fkey",
		}),
		foreignKey({
			columns: [table.disciplineId],
			foreignColumns: [disciplines.id],
			name: "teacher_contracts__discipline_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherContractModelId],
			foreignColumns: [teacherContractModels.id],
			name: "teacher_contracts__teacher_contract_model_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "teacher_contracts__teacher_id_fkey",
		}),
	],
)
