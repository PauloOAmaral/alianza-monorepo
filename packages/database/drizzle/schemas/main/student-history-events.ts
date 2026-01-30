import {
	char,
	foreignKey,
	index,
	pgEnum,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { students } from "./students"

export const studentEventType = pgEnum("student_event_type", [
	"student_registered", // 0 - Matriculou o Aluno
	"transfer_request", // 1 - Solicitou transferência
	"add_collector", // 2 - Adicionou Cobrador ao Aluno
	"reactivate_student", // 3 - Reativou o Aluno
	"collector_removed", // 4 - Removeu o Cobrador do Aluno
	"collector_removed_inative", // 50 - Removeu o Cobrador que foi cancelado do Aluno
	"change_new_class_in_app", // 51 - Alterou aluno para aula vídeo ou meet.
	"student_waiting_instructor", // 5 - Aluno Aguardando professor
	"instructor_accept_request", // 6 - Professor Aceitou Aluno
	"instructor_refuse_request", // 7 - Professor Recusou Aluno
	"instructor_transfer_solicitation", // 8 - Professor Transferiu Aluno
	"invoice_paid", // 9 - Fatura Paga
	"student_blocked", // 10 - Aluno Bloqueado (C#: StudentBloqued)
	"student_completed_class", // 11 - Aluno Completou a Aula
	"instructor_inactivation", // 12 - Instrutor ficou inativo
	"student_missed_class", // 13 - Aluno faltou à aula
	"financial_message", // 14 - Mensagem financeira
	"student_cancel_request", // 15 - Aluno solicitou cancelamento
	"student_pause_request", // 16 - Aluno solicitou pausa
	"student_paused", // 17 - Aluno pausou
	"student_reactivated", // 18 - Aluno retornou de pausa
	"student_canceled", // 19 - Aluno cancelou
	"lead_disqualified", // 20 - Lead desqualificado
	"lead_transfer_seller", // 21 - Lead atribuição de consultor
	"lead_contract_signed", // 22 - Contrato de Lead Assinado
	"experimental_class_rescheduled", // 23 - Aula experimental reagendada.
	"contract_create", // 24 - Contrato criado
	"seller_cancel_request", // 26 - Aluno solicitou cancelamento
	"class_reschedule", // 28 - Aula reagendada
	"class_completed_manual", // 29 - Aula Completa Manual
	"class_missed_manual", // 30 - Aula Falta Manual
	"class_canceled_manual", // 31 - Aula Cancelada Manual (C#: ClassCanceladManual)
	"class_refunded_manual", // 32 - Aula Estornada Manual
	"class_missed_instructor_manual", // 33 - Aula Falta Professor Manual
	"class_awaiting_student_approve_manual", // 34 - Aula Aguardando Aprovação Aluno Manual
	"class_created_manual", // 35 - Aula Criada Manual
	"class_edited_manual", // 36 - Aula Editada Manual
	"instructor_not_approve_in_time", // 37 - Instrutor não aceitou solicitação à tempo
	"return_auto_transfer", // 38 - Retorno para Fluxo de Distribuição Automática
	"move_to_manual_transfer", // 39 - Movido para Fluxo de Distribuição Manual
	"manual_transfer", // 40 - Transferência de Aluno p/ fluxo Manual
	"manual_instructor_allocation", // 41 - Alocação do professor feita de forma Manual (C#: ManualInstructorAlocation)
	"first_auto_allocation", // 42 - Primeira alocação Automática
	"lead_contract_open_to_signed", // 43 - Contrato aberto para assinatura pelo Student
	"lead_contract_update_data", // 44 - Dados do Contrato atualizado pelo Student
	"auto_return_stop", // 45 - Retorno de Pausa Automático
	"put_in_pre_hibernation", // 46 - Solicitado Hibernação por motivo de ausências.
	"auto_cancel_stop_hibernation", // 47 - Auto Removido Instrutor devido solicitação de Pausa/Cancelamento/Hibernação. (C#: AutoCanceStopHibernation)
	"put_in_hibernation", // 48 - Colocado em Hibernação.
	"manual_distribution_after_stop", // 49 - Colocado em Fila manual após pausa. (C#: ManualDistribuitionAfterStop)
	"restart_distribution_after_expired", // 52 - Reiniciou a distribuição que estava expirada.
	"cancel_contract", // 53 - Cancelou contrato do aluno.
	"discipline_contract_change", // 54 - Alterou idioma do contrato do aluno. (C#: DisciplineContractChange)
	"reallocation", // 55 - Solicitou realocação. (C#: Rellocation)
	"change_email", // 56 - Trocou o e-mail.
	"contract_start_date_change", // 57 - Alterou data de início do contrato do aluno.
	"manual_sign_contract", // 58 - Subiu uma assinatura manual de contrato. (C#: ManuaSignContract)
	"manual_sign_contract_company", // 59 - Subiu uma assinatura manual de contrato empresarial.
	"canceled_stop_cancel_job", // 60 - Cancelou a Solicitação de Cancelamento/Pausa
	"back_to_manual_teacher_not_found", // 61 - Retornou para o fluxo manual por não encontrar teacher disponível.
	"new_auto_allocation", // 62 - Alocou novo Teacher por tempo expirado.
	"move_to_expired_auto_allocation", // 63 - Movido para Expirado por não conseguir alocar após 10 tentativas.
	"change_contract_option", // 64 - Alterou horários do aluno
	"auto_stop", // 65 - Pausa Automática
	"student_teacher_request_cancel", // 66 - Cancelou a Solicitação de Alocação
	"student_reject_class", // 67 - Aluno rejeitou a aula
	"change_end_of_term", // 68 - Alterou data fim do Contrato
	"user_message", // 9999 - Auditoria Administrativa
])

export const studentHistoryEvents = pgTable(
	"student_history_events",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		type: studentEventType("type").notNull(),
		schoolRegistry: char("school_registry", { length: 14 }).notNull(),
		userName: varchar("user_name", { length: 200 }).notNull(),
		description: text("description"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_history_events_deleted_at_idx").on(table.deletedAt),
		index("student_history_events__student_id_idx").on(table.studentId),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_history_events_fkey",
		}),
	],
)
