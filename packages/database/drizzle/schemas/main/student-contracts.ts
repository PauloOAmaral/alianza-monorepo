import {
	boolean,
	decimal,
	foreignKey,
	index,
	integer,
	json,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { level as levelEnum, paymentType as paymentTypeEnum } from "../common"
import { currencies } from "./currencies"
import { dataContracts } from "./data-contracts"
import { disciplines } from "./disciplines"
import { leads } from "./leads"
import { sellers } from "./sellers"
import { studentContractModels } from "./student-contract-models"
import { students } from "./students"
import { teachers } from "./teachers"

export const cancelReason = pgEnum("cancel_reason", [
	"teacher", // Professor = 0
	"methodology", // Metodologia = 1
	"default", // Inadimplência = 2
	"personal", // Pessoais = 3
	"financial", // Financeiro = 4
	"cdc", // CDC = 5
	"did_not_want_to_renew", // Não quis renovar = 6
	"did_not_start", // Não iniciou = 7
])

export const contractSignStatus = pgEnum("contract_sign_status", [
	"waiting_sign", // Aguardando Assinatura = 0 (C#: WatingSign)
	"opened", // Visualizado = 1
	"in_progress", // Em Progresso = 2
	"update_data", // Dados Atualizados = 3
	"signed", // Assinado = 4
])

export const contractStatus = pgEnum("contract_status", [
	"blocked", // Bloqueado = 0
	"active", // Ativo = 1
	"canceled", // Cancelado = 2
])

export const studentContracts = pgTable(
	"student_contracts",
	{
		id,
		studentId: varchar("student_id", { length: 16 }),
		leadId: varchar("lead_id", { length: 16 }),
		studentContractModelId: varchar("student_contract_model_id", { length: 16 }).notNull(),
		dataContractId: varchar("data_contract_id", { length: 16 }).notNull(),
		disciplineId: varchar("discipline_id", { length: 16 }).notNull(),
		currencyId: varchar("currency_id", { length: 16 }).notNull(),
		startDate: timestamp("start_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		firstPaymentDate: timestamp("first_payment_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		duration: integer("duration").notNull(),
		freeMonths: integer("free_months").notNull(),
		paidMonths: integer("paid_months").notNull(),
		endOfTerm: timestamp("end_of_term", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		status: contractStatus("status").notNull(),
		signStatus: contractSignStatus("sign_status").notNull(),
		signDate: timestamp("sign_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		maxValue: decimal("max_value", { precision: 18, scale: 2 }).notNull(),
		value: decimal("value", { precision: 18, scale: 2 }).notNull(),
		level: levelEnum("level").notNull(),
		paymentType: paymentTypeEnum("payment_type").notNull(),
		isTotalPayment: boolean("is_total_payment").notNull(),
		classDuration: integer("class_duration").notNull(),
		weeklyClassCount: integer("weekly_class_count").notNull(),
		weight: decimal("weight", { precision: 18, scale: 2 }).notNull(),
		contractPackageSnapShot: json("contract_package_snap_shot"),
		teacherId: varchar("teacher_id", { length: 16 }),
		reschedulingLimit: integer("rescheduling_limit").notNull(),
		sellerId: varchar("seller_id", { length: 16 }),
		fileLink: text("file_link"),
		signFileLink: text("sign_file_link"),
		isNative: boolean("is_native").notNull(),
		isResponsible: boolean("is_responsible").default(false).notNull(),
		userAdminEntityId: varchar("user_admin_entity_id", { length: 16 }),
		minValue: decimal("min_value", { precision: 18, scale: 2 }),
		registerValue: decimal("register_value", { precision: 18, scale: 2 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_contracts__currency_id_idx").on(table.currencyId),
		uniqueIndex("student_contracts__data_contract_id_key").on(table.dataContractId),
		index("student_contracts__discipline_id_idx").on(table.disciplineId),
		uniqueIndex("student_contracts__lead_id_key").on(table.leadId),
		index("student_contracts_deleted_at_idx").on(table.deletedAt),
		index("student_contracts__seller_id_idx").on(table.sellerId),
		index("student_contracts__student_contract_model_id_idx").on(table.studentContractModelId),
		index("student_contracts__student_id_idx").on(table.studentId),
		index("student_contracts__teacher_id_idx").on(table.teacherId),
		foreignKey({
			columns: [table.currencyId],
			foreignColumns: [currencies.id],
			name: "student_contracts__currency_id_fkey",
		}),
		foreignKey({
			columns: [table.dataContractId],
			foreignColumns: [dataContracts.id],
			name: "student_contracts__data_contract_id_fkey",
		}),
		foreignKey({
			columns: [table.disciplineId],
			foreignColumns: [disciplines.id],
			name: "student_contracts__discipline_id_fkey",
		}),
		foreignKey({
			columns: [table.leadId],
			foreignColumns: [leads.id],
			name: "student_contracts__lead_id_fkey",
		}),
		foreignKey({
			columns: [table.sellerId],
			foreignColumns: [sellers.id],
			name: "student_contracts__seller_id_fkey",
		}),
		foreignKey({
			columns: [table.studentContractModelId],
			foreignColumns: [studentContractModels.id],
			name: "student_contracts__student_contract_model_id_fkey",
		}),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_contracts__student_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "student_contracts__teacher_id_fkey",
		}),
	],
)
