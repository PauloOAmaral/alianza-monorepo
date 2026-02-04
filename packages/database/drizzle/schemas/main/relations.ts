import { relations } from 'drizzle-orm/_relations'
import { addresses, userTenants } from '../common'
import { bankAccounts } from './bank-accounts'
import { banks } from './banks'
import { collectors } from './collectors'
import { contractSignJobControls } from './contract-sign-job-controls'
import { contractTokens } from './contract-tokens'
import { countries } from './countries'
import { currencies } from './currencies'
import { dataContracts } from './data-contracts'
import { disciplines } from './disciplines'
import { financialResponsibles } from './financial-responsibles'
import { internalCampaigns } from './internal-campaigns'
import { invoiceItens } from './invoice-itens'
import { invoiceNotes } from './invoice-notes'
import { invoices } from './invoices'
import { issueActivities } from './issue-activities'
import { issueAttachments } from './issue-attachments'
import { issueComments } from './issue-comments'
import { issues } from './issues'
import { leadImportFiles } from './lead-import-files'
import { leadImports } from './lead-imports'
import { leadNotes } from './lead-notes'
import { leadTags } from './lead-tags'
import { leadWithTags } from './lead-with-tags'
import { leads } from './leads'
import { materialWithExperimentalFeedbacks } from './material-with-experimental-feedbacks'
import { materials } from './materials'
import { nationalHolidays } from './national-holidays'
import { payments } from './payments'
import { refreshTokens } from './refresh-tokens'
import { sellers } from './sellers'
import { squadManagers } from './squad-managers'
import { squads } from './squads'
import { studentCancelPauseJob } from './student-cancel-pause-job'
import { studentClassExperimentalFeedbacks } from './student-class-experimental-feedbacks'
import { studentClassMeetEvents } from './student-class-meet-events'
import { studentClassStudentFeedbacks } from './student-class-student-feedbacks'
import { studentClassTeacherFeedbacks } from './student-class-teacher-feedbacks'
import { studentClasses } from './student-classes'
import { studentContractClassOptions } from './student-contract-class-options'
import { studentContractModels } from './student-contract-models'
import { studentContractPackages } from './student-contract-packages'
import { studentContracts } from './student-contracts'
import { studentHistoryEvents } from './student-history-events'
import { studentInternalNotes } from './student-internal-notes'
import { studentProfessions } from './student-professions'
import { studentRequestEvents } from './student-request-events'
import { studentRequestTypes } from './student-request-types'
import { studentRequests } from './student-requests'
import { studentSpecificConditions } from './student-specific-conditions'
import { studentTeacherObservations } from './student-teacher-observations'
import { studentTeacherRequestAttributes } from './student-teacher-request-attributes'
import { studentTeacherRequests } from './student-teacher-requests'
import { studentTerms } from './student-terms'
import { studentTransferReasons } from './student-transfer-reasons'
import { studentWithMaterials } from './student-with-materials'
import { studentWithTerms } from './student-with-terms'
import { students } from './students'
import { teacherAttributeWithExperimentalFeedbacks } from './teacher-attribute-with-experimental-feedbacks'
import { teacherAttributes } from './teacher-attributes'
import { teacherAvailabilities } from './teacher-availabilities'
import { teacherContractModels } from './teacher-contract-models'
import { teacherContracts } from './teacher-contracts'
import { teacherHistoryEvents } from './teacher-history-events'
import { teacherInternalNotes } from './teacher-internal-notes'
import { teacherRequestEvents } from './teacher-request-events'
import { teacherRequestTypes } from './teacher-request-types'
import { teacherRequests } from './teacher-requests'
import { teacherTerms } from './teacher-terms'
import { teacherTransferHistories } from './teacher-transfer-histories'
import { teacherWithAttributes } from './teacher-with-attributes'
import { teacherWithTerms } from './teacher-with-terms'
import { teachers } from './teachers'

// --- Core: countries ---
export const countriesRelations = relations(countries, ({ many }) => ({
    students: many(students),
    teachers: many(teachers),
    banks: many(banks),
    financialResponsibles: many(financialResponsibles),
    dataContracts: many(dataContracts),
    nationalHolidays: many(nationalHolidays)
}))

// --- Core: students ---
export const studentsRelations = relations(students, ({ one, many }) => ({
    address: one(addresses, { fields: [students.addressId], references: [addresses.id] }),
    collector: one(collectors, { fields: [students.collectorId], references: [collectors.id] }),
    nationality: one(countries, { fields: [students.nationalityId], references: [countries.id] }),
    financialResponsible: one(financialResponsibles, {
        fields: [students.financialResponsibleId],
        references: [financialResponsibles.id]
    }),
    studentClasses: many(studentClasses),
    invoices: many(invoices),
    studentContracts: many(studentContracts),
    studentRequests: many(studentRequests),
    studentInternalNotes: many(studentInternalNotes),
    studentHistoryEvents: many(studentHistoryEvents),
    studentWithMaterials: many(studentWithMaterials),
    studentWithTerms: many(studentWithTerms),
    studentTeacherRequests: many(studentTeacherRequests),
    studentTeacherObservations: many(studentTeacherObservations, { relationName: 'studentObservations' }),
    teacherTransferHistories: many(teacherTransferHistories),
    studentCancelPauseJob: many(studentCancelPauseJob)
}))

// --- Core: teachers ---
export const teachersRelations = relations(teachers, ({ one, many }) => ({
    address: one(addresses, { fields: [teachers.addressId], references: [addresses.id] }),
    bankAccount: one(bankAccounts, { fields: [teachers.bankAccountId], references: [bankAccounts.id] }),
    nationality: one(countries, { fields: [teachers.nationalityId], references: [countries.id] }),
    squad: one(squads, { fields: [teachers.squadId], references: [squads.id] }),
    studentClasses: many(studentClasses),
    teacherContracts: many(teacherContracts),
    teacherHistoryEvents: many(teacherHistoryEvents),
    teacherRequests: many(teacherRequests),
    teacherWithAttributes: many(teacherWithAttributes),
    teacherWithTerms: many(teacherWithTerms),
    teacherAvailabilities: many(teacherAvailabilities),
    teacherInternalNotes: many(teacherInternalNotes),
    studentContracts: many(studentContracts),
    studentTeacherRequests: many(studentTeacherRequests),
    studentTeacherObservations: many(studentTeacherObservations, { relationName: 'teacherObservations' }),
    studentClassTeacherFeedbacks: many(studentClassTeacherFeedbacks),
    teacherTransferHistories: many(teacherTransferHistories),
    materials: many(materials)
}))

// --- Core: squads ---
export const squadsRelations = relations(squads, ({ many }) => ({
    teachers: many(teachers),
    squadManagers: many(squadManagers)
}))

// --- Core: collectors ---
export const collectorsRelations = relations(collectors, ({ many }) => ({
    students: many(students),
    invoices: many(invoices)
}))

// --- Core: financial responsibles ---
export const financialResponsiblesRelations = relations(financialResponsibles, ({ one, many }) => ({
    address: one(addresses, { fields: [financialResponsibles.addressId], references: [addresses.id] }),
    nationality: one(countries, {
        fields: [financialResponsibles.nationalityId],
        references: [countries.id]
    }),
    students: many(students)
}))

// --- Core: bank accounts, banks ---
export const bankAccountsRelations = relations(bankAccounts, ({ many }) => ({
    teachers: many(teachers)
}))

export const banksRelations = relations(banks, ({ one }) => ({
    country: one(countries, { fields: [banks.countryId], references: [countries.id] })
}))

// --- Disciplines ---
export const disciplinesRelations = relations(disciplines, ({ many }) => ({
    studentClasses: many(studentClasses),
    teacherContracts: many(teacherContracts),
    studentContracts: many(studentContracts),
    studentContractPackages: many(studentContractPackages),
    leads: many(leads)
}))

// --- Leads ---
export const leadsRelations = relations(leads, ({ one, many }) => ({
    discipline: one(disciplines, { fields: [leads.disciplineId], references: [disciplines.id] }),
    internalCampaign: one(internalCampaigns, {
        fields: [leads.internalCampaignId],
        references: [internalCampaigns.id]
    }),
    seller: one(sellers, { fields: [leads.sellerId], references: [sellers.id] }),
    studentClasses: many(studentClasses),
    studentContracts: many(studentContracts),
    leadNotes: many(leadNotes),
    leadImportFiles: many(leadImportFiles),
    leadWithTags: many(leadWithTags),
    studentClassExperimentalFeedbacks: many(studentClassExperimentalFeedbacks)
}))

// --- Internal campaigns, sellers (no FK from main - only referenced) ---
export const internalCampaignsRelations = relations(internalCampaigns, ({ many }) => ({
    leads: many(leads),
    leadImportFiles: many(leadImportFiles)
}))

export const sellersRelations = relations(sellers, ({ many }) => ({
    leads: many(leads),
    studentContracts: many(studentContracts)
}))

// --- Invoices and invoice itens ---
export const invoicesRelations = relations(invoices, ({ one, many }) => ({
    student: one(students, { fields: [invoices.studentId], references: [students.id] }),
    currency: one(currencies, { fields: [invoices.currencyId], references: [currencies.id] }),
    collector: one(collectors, { fields: [invoices.collectorId], references: [collectors.id] }),
    invoiceItens: many(invoiceItens),
    invoiceNotes: many(invoiceNotes),
    payments: many(payments)
}))

export const invoiceItensRelations = relations(invoiceItens, ({ one, many }) => ({
    invoice: one(invoices, { fields: [invoiceItens.invoiceId], references: [invoices.id] }),
    studentContract: one(studentContracts, {
        fields: [invoiceItens.studentContractId],
        references: [studentContracts.id]
    }),
    studentClasses: many(studentClasses)
}))

export const invoiceNotesRelations = relations(invoiceNotes, ({ one }) => ({
    invoice: one(invoices, { fields: [invoiceNotes.invoiceId], references: [invoices.id] })
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
    invoice: one(invoices, { fields: [payments.invoiceId], references: [invoices.id] })
}))

export const currenciesRelations = relations(currencies, ({ many }) => ({
    invoices: many(invoices),
    studentContracts: many(studentContracts),
    studentContractPackages: many(studentContractPackages)
}))

// --- Student contracts ---
export const studentContractsRelations = relations(studentContracts, ({ one, many }) => ({
    student: one(students, { fields: [studentContracts.studentId], references: [students.id] }),
    lead: one(leads, { fields: [studentContracts.leadId], references: [leads.id] }),
    studentContractModel: one(studentContractModels, {
        fields: [studentContracts.studentContractModelId],
        references: [studentContractModels.id]
    }),
    dataContract: one(dataContracts, {
        fields: [studentContracts.dataContractId],
        references: [dataContracts.id]
    }),
    discipline: one(disciplines, {
        fields: [studentContracts.disciplineId],
        references: [disciplines.id]
    }),
    currency: one(currencies, { fields: [studentContracts.currencyId], references: [currencies.id] }),
    teacher: one(teachers, { fields: [studentContracts.teacherId], references: [teachers.id] }),
    seller: one(sellers, { fields: [studentContracts.sellerId], references: [sellers.id] }),
    invoiceItens: many(invoiceItens),
    studentTeacherRequests: many(studentTeacherRequests),
    studentContractClassOptions: many(studentContractClassOptions),
    studentCancelPauseJob: many(studentCancelPauseJob),
    contractSignJobControls: many(contractSignJobControls),
    contractTokens: many(contractTokens)
}))

export const studentContractModelsRelations = relations(studentContractModels, ({ many }) => ({
    studentContracts: many(studentContracts)
}))

export const studentContractPackagesRelations = relations(studentContractPackages, ({ one }) => ({
    currency: one(currencies, {
        fields: [studentContractPackages.currencyId],
        references: [currencies.id]
    }),
    discipline: one(disciplines, {
        fields: [studentContractPackages.disciplineId],
        references: [disciplines.id]
    })
}))

export const studentContractClassOptionsRelations = relations(studentContractClassOptions, ({ one }) => ({
    studentContract: one(studentContracts, {
        fields: [studentContractClassOptions.studentContractId],
        references: [studentContracts.id]
    })
}))

export const studentCancelPauseJobRelations = relations(studentCancelPauseJob, ({ one }) => ({
    student: one(students, {
        fields: [studentCancelPauseJob.studentId],
        references: [students.id]
    })
}))

// --- Data contracts ---
export const dataContractsRelations = relations(dataContracts, ({ one, many }) => ({
    address: one(addresses, { fields: [dataContracts.addressId], references: [addresses.id] }),
    nationality: one(countries, {
        fields: [dataContracts.nationalityId],
        references: [countries.id]
    }),
    teacherContracts: many(teacherContracts),
    studentContracts: many(studentContracts)
}))

// --- Teacher contracts ---
export const teacherContractsRelations = relations(teacherContracts, ({ one, many }) => ({
    teacher: one(teachers, { fields: [teacherContracts.teacherId], references: [teachers.id] }),
    discipline: one(disciplines, {
        fields: [teacherContracts.disciplineId],
        references: [disciplines.id]
    }),
    teacherContractModel: one(teacherContractModels, {
        fields: [teacherContracts.teacherContractModelId],
        references: [teacherContractModels.id]
    }),
    dataContract: one(dataContracts, {
        fields: [teacherContracts.dataContractId],
        references: [dataContracts.id]
    }),
    contractSignJobControls: many(contractSignJobControls),
    contractTokens: many(contractTokens)
}))

export const teacherContractModelsRelations = relations(teacherContractModels, ({ many }) => ({
    teacherContracts: many(teacherContracts)
}))

export const contractSignJobControlsRelations = relations(contractSignJobControls, ({ one }) => ({
    studentContract: one(studentContracts, {
        fields: [contractSignJobControls.studentContractId],
        references: [studentContracts.id]
    }),
    teacherContract: one(teacherContracts, {
        fields: [contractSignJobControls.teacherContractId],
        references: [teacherContracts.id]
    })
}))

export const contractTokensRelations = relations(contractTokens, ({ one }) => ({
    studentContract: one(studentContracts, {
        fields: [contractTokens.studentContractId],
        references: [studentContracts.id]
    }),
    teacherContract: one(teacherContracts, {
        fields: [contractTokens.teacherContractId],
        references: [teacherContracts.id]
    })
}))

// --- Student classes ---
export const studentClassesRelations = relations(studentClasses, ({ one, many }) => ({
    discipline: one(disciplines, {
        fields: [studentClasses.disciplineId],
        references: [disciplines.id]
    }),
    invoiceItem: one(invoiceItens, {
        fields: [studentClasses.invoiceItemId],
        references: [invoiceItens.id]
    }),
    lead: one(leads, { fields: [studentClasses.leadId], references: [leads.id] }),
    student: one(students, { fields: [studentClasses.studentId], references: [students.id] }),
    teacher: one(teachers, { fields: [studentClasses.teacherId], references: [teachers.id] }),
    studentClassMeetEvents: many(studentClassMeetEvents),
    studentClassStudentFeedbacks: many(studentClassStudentFeedbacks),
    studentClassExperimentalFeedbacks: many(studentClassExperimentalFeedbacks),
    studentClassTeacherFeedbacks: many(studentClassTeacherFeedbacks)
}))

export const studentClassMeetEventsRelations = relations(studentClassMeetEvents, ({ one }) => ({
    studentClass: one(studentClasses, {
        fields: [studentClassMeetEvents.studentClassId],
        references: [studentClasses.id]
    }),
    userTenant: one(userTenants, {
        fields: [studentClassMeetEvents.userTenantId],
        references: [userTenants.id]
    })
}))

export const studentClassStudentFeedbacksRelations = relations(studentClassStudentFeedbacks, ({ one }) => ({
    studentClass: one(studentClasses, {
        fields: [studentClassStudentFeedbacks.studentClassId],
        references: [studentClasses.id]
    })
}))

export const studentClassExperimentalFeedbacksRelations = relations(
    studentClassExperimentalFeedbacks,
    ({ one, many }) => ({
        studentClass: one(studentClasses, {
            fields: [studentClassExperimentalFeedbacks.studentClassId],
            references: [studentClasses.id]
        }),
        lead: one(leads, {
            fields: [studentClassExperimentalFeedbacks.leadId],
            references: [leads.id]
        }),
        studentProfession: one(studentProfessions, {
            fields: [studentClassExperimentalFeedbacks.studentProfessionId],
            references: [studentProfessions.id]
        }),
        studentSpecificCondition: one(studentSpecificConditions, {
            fields: [studentClassExperimentalFeedbacks.studentSpecificConditionId],
            references: [studentSpecificConditions.id]
        }),
        teacherAttributeWithExperimentalFeedbacks: many(teacherAttributeWithExperimentalFeedbacks),
        materialWithExperimentalFeedbacks: many(materialWithExperimentalFeedbacks)
    })
)

export const studentClassTeacherFeedbacksRelations = relations(studentClassTeacherFeedbacks, ({ one }) => ({
    studentClass: one(studentClasses, {
        fields: [studentClassTeacherFeedbacks.studentClassId],
        references: [studentClasses.id]
    }),
    teacher: one(teachers, {
        fields: [studentClassTeacherFeedbacks.teacherEntityId],
        references: [teachers.id]
    })
}))

// --- Teacher attributes and junction ---
export const teacherAttributesRelations = relations(teacherAttributes, ({ many }) => ({
    teacherWithAttributes: many(teacherWithAttributes),
    teacherAttributeWithExperimentalFeedbacks: many(teacherAttributeWithExperimentalFeedbacks),
    studentTeacherRequestAttributes: many(studentTeacherRequestAttributes)
}))

export const teacherWithAttributesRelations = relations(teacherWithAttributes, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherWithAttributes.teacherId],
        references: [teachers.id]
    }),
    teacherAttribute: one(teacherAttributes, {
        fields: [teacherWithAttributes.teacherAttributeId],
        references: [teacherAttributes.id]
    })
}))

export const teacherAttributeWithExperimentalFeedbacksRelations = relations(
    teacherAttributeWithExperimentalFeedbacks,
    ({ one }) => ({
        teacherAttribute: one(teacherAttributes, {
            fields: [teacherAttributeWithExperimentalFeedbacks.teacherAttributeId],
            references: [teacherAttributes.id]
        }),
        studentClassExperimentalFeedback: one(studentClassExperimentalFeedbacks, {
            fields: [teacherAttributeWithExperimentalFeedbacks.studentClassExperimentalFeedbackId],
            references: [studentClassExperimentalFeedbacks.id]
        })
    })
)

// --- Teacher terms ---
export const teacherTermsRelations = relations(teacherTerms, ({ many }) => ({
    teacherWithTerms: many(teacherWithTerms)
}))

export const teacherWithTermsRelations = relations(teacherWithTerms, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherWithTerms.teacherId],
        references: [teachers.id]
    }),
    teacherTerm: one(teacherTerms, {
        fields: [teacherWithTerms.teacherTermId],
        references: [teacherTerms.id]
    })
}))

// --- Teacher history, requests, events ---
export const teacherHistoryEventsRelations = relations(teacherHistoryEvents, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherHistoryEvents.teacherId],
        references: [teachers.id]
    })
}))

export const teacherRequestTypesRelations = relations(teacherRequestTypes, ({ many }) => ({
    teacherRequests: many(teacherRequests)
}))

export const teacherRequestsRelations = relations(teacherRequests, ({ one, many }) => ({
    teacher: one(teachers, {
        fields: [teacherRequests.teacherId],
        references: [teachers.id]
    }),
    teacherRequestType: one(teacherRequestTypes, {
        fields: [teacherRequests.teacherRequestTypeId],
        references: [teacherRequestTypes.id]
    }),
    teacherRequestEvents: many(teacherRequestEvents)
}))

export const teacherRequestEventsRelations = relations(teacherRequestEvents, ({ one }) => ({
    teacherRequest: one(teacherRequests, {
        fields: [teacherRequestEvents.teacherRequestId],
        references: [teacherRequests.id]
    })
}))

export const teacherAvailabilitiesRelations = relations(teacherAvailabilities, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherAvailabilities.teacherId],
        references: [teachers.id]
    })
}))

export const teacherInternalNotesRelations = relations(teacherInternalNotes, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherInternalNotes.teacherId],
        references: [teachers.id]
    })
}))

// --- Teacher transfer histories ---
export const teacherTransferHistoriesRelations = relations(teacherTransferHistories, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teacherTransferHistories.teacherId],
        references: [teachers.id]
    }),
    student: one(students, {
        fields: [teacherTransferHistories.studentId],
        references: [students.id]
    }),
    studentTransferReason: one(studentTransferReasons, {
        fields: [teacherTransferHistories.studentTransferReasonId],
        references: [studentTransferReasons.id]
    })
}))

export const studentTransferReasonsRelations = relations(studentTransferReasons, ({ many }) => ({
    teacherTransferHistories: many(teacherTransferHistories)
}))

// --- Student teacher requests ---
export const studentTeacherRequestsRelations = relations(studentTeacherRequests, ({ one, many }) => ({
    student: one(students, {
        fields: [studentTeacherRequests.studentId],
        references: [students.id]
    }),
    teacher: one(teachers, {
        fields: [studentTeacherRequests.teacherId],
        references: [teachers.id]
    }),
    studentContract: one(studentContracts, {
        fields: [studentTeacherRequests.studentContractId],
        references: [studentContracts.id]
    }),
    studentTeacherRequestAttributes: many(studentTeacherRequestAttributes)
}))

export const studentTeacherRequestAttributesRelations = relations(
    studentTeacherRequestAttributes,
    ({ one }) => ({
        studentTeacherRequest: one(studentTeacherRequests, {
            fields: [studentTeacherRequestAttributes.studentTeacherRequestId],
            references: [studentTeacherRequests.id]
        }),
        teacherAttribute: one(teacherAttributes, {
            fields: [studentTeacherRequestAttributes.teacherAttributeId],
            references: [teacherAttributes.id]
        })
    })
)

export const studentTeacherObservationsRelations = relations(
    studentTeacherObservations,
    ({ one }) => ({
        student: one(students, {
            fields: [studentTeacherObservations.studentId],
            references: [students.id],
            relationName: 'studentObservations'
        }),
        teacher: one(teachers, {
            fields: [studentTeacherObservations.teacherId],
            references: [teachers.id],
            relationName: 'teacherObservations'
        })
    })
)

// --- Student requests ---
export const studentRequestTypesRelations = relations(studentRequestTypes, ({ many }) => ({
    studentRequests: many(studentRequests)
}))

export const studentRequestsRelations = relations(studentRequests, ({ one, many }) => ({
    student: one(students, {
        fields: [studentRequests.studentId],
        references: [students.id]
    }),
    studentRequestType: one(studentRequestTypes, {
        fields: [studentRequests.studentRequestTypeId],
        references: [studentRequestTypes.id]
    }),
    studentRequestEvents: many(studentRequestEvents)
}))

export const studentRequestEventsRelations = relations(studentRequestEvents, ({ one }) => ({
    studentRequest: one(studentRequests, {
        fields: [studentRequestEvents.studentRequestId],
        references: [studentRequests.id]
    })
}))

// --- Student internal notes, history, ranking ---
export const studentInternalNotesRelations = relations(studentInternalNotes, ({ one }) => ({
    student: one(students, {
        fields: [studentInternalNotes.studentId],
        references: [students.id]
    })
}))

export const studentHistoryEventsRelations = relations(studentHistoryEvents, ({ one }) => ({
    student: one(students, {
        fields: [studentHistoryEvents.studentId],
        references: [students.id]
    })
}))

// --- Student terms, with terms, with materials ---
export const studentTermsRelations = relations(studentTerms, ({ many }) => ({
    studentWithTerms: many(studentWithTerms)
}))

export const studentWithTermsRelations = relations(studentWithTerms, ({ one }) => ({
    student: one(students, {
        fields: [studentWithTerms.studentId],
        references: [students.id]
    }),
    studentTerm: one(studentTerms, {
        fields: [studentWithTerms.studentTermId],
        references: [studentTerms.id]
    })
}))

export const materialsRelations = relations(materials, ({ one, many }) => ({
    teacher: one(teachers, { fields: [materials.teacherId], references: [teachers.id] }),
    studentWithMaterials: many(studentWithMaterials),
    materialWithExperimentalFeedbacks: many(materialWithExperimentalFeedbacks)
}))

export const studentWithMaterialsRelations = relations(studentWithMaterials, ({ one }) => ({
    student: one(students, {
        fields: [studentWithMaterials.studentId],
        references: [students.id]
    }),
    material: one(materials, {
        fields: [studentWithMaterials.materialId],
        references: [materials.id]
    })
}))

export const materialWithExperimentalFeedbacksRelations = relations(
    materialWithExperimentalFeedbacks,
    ({ one }) => ({
        material: one(materials, {
            fields: [materialWithExperimentalFeedbacks.materialId],
            references: [materials.id]
        }),
        studentClassExperimentalFeedback: one(studentClassExperimentalFeedbacks, {
            fields: [materialWithExperimentalFeedbacks.studentClassExperimentalFeedbackId],
            references: [studentClassExperimentalFeedbacks.id]
        })
    })
)

// --- Student professions, specific conditions ---
export const studentProfessionsRelations = relations(studentProfessions, ({ many }) => ({
    studentClassExperimentalFeedbacks: many(studentClassExperimentalFeedbacks)
}))

export const studentSpecificConditionsRelations = relations(studentSpecificConditions, ({ many }) => ({
    studentClassExperimentalFeedbacks: many(studentClassExperimentalFeedbacks)
}))

// --- Lead notes, imports, tags ---
export const leadNotesRelations = relations(leadNotes, ({ one }) => ({
    lead: one(leads, { fields: [leadNotes.leadId], references: [leads.id] })
}))

export const leadTagsRelations = relations(leadTags, ({ many }) => ({
    leadWithTags: many(leadWithTags)
}))

export const leadWithTagsRelations = relations(leadWithTags, ({ one }) => ({
    lead: one(leads, { fields: [leadWithTags.leadId], references: [leads.id] }),
    leadTag: one(leadTags, {
        fields: [leadWithTags.leadTagId],
        references: [leadTags.id]
    })
}))

export const leadImportFilesRelations = relations(leadImportFiles, ({ one, many }) => ({
    internalCampaign: one(internalCampaigns, {
        fields: [leadImportFiles.internalCampaignId],
        references: [internalCampaigns.id]
    }),
    leadImports: many(leadImports)
}))

export const leadImportsRelations = relations(leadImports, ({ one }) => ({
    leadImportFile: one(leadImportFiles, {
        fields: [leadImports.leadImportFileId],
        references: [leadImportFiles.id]
    }),
    lead: one(leads, { fields: [leadImports.leadId], references: [leads.id] })
}))

// --- National holidays ---
export const nationalHolidaysRelations = relations(nationalHolidays, ({ one }) => ({
    country: one(countries, {
        fields: [nationalHolidays.countryId],
        references: [countries.id]
    })
}))

// --- Squad managers ---
export const squadManagersRelations = relations(squadManagers, ({ one }) => ({
    squad: one(squads, {
        fields: [squadManagers.squadId],
        references: [squads.id]
    })
}))

// --- Issues ---
export const issuesRelations = relations(issues, ({ many }) => ({
    issueActivities: many(issueActivities),
    issueAttachments: many(issueAttachments),
    issueComments: many(issueComments)
}))

export const issueActivitiesRelations = relations(issueActivities, ({ one }) => ({
    issue: one(issues, {
        fields: [issueActivities.issueId],
        references: [issues.id]
    }),
    userTenant: one(userTenants, {
        fields: [issueActivities.userTenantId],
        references: [userTenants.id]
    })
}))

export const issueAttachmentsRelations = relations(issueAttachments, ({ one }) => ({
    issue: one(issues, {
        fields: [issueAttachments.issueId],
        references: [issues.id]
    })
}))

export const issueCommentsRelations = relations(issueComments, ({ one }) => ({
    issue: one(issues, {
        fields: [issueComments.issueId],
        references: [issues.id]
    }),
    userTenant: one(userTenants, {
        fields: [issueComments.userTenantId],
        references: [userTenants.id]
    })
}))

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
    userTenant: one(userTenants, {
        fields: [refreshTokens.userTenantId],
        references: [userTenants.id]
    })
}))

export * from '../common/relations'