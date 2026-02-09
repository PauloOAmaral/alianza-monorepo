/**
 * Enum types derived from database pgEnum definitions via .enumValues.
 * Re-exports schema enums and type aliases from (typeof enum.enumValues)[number].
 */

import { documentType, gender, languageType, level, paymentType, permissionType, userContextRoleType, userType } from '../../drizzle/schemas/common/auth'
import { americanTimezone, type americanTimezone as americanTimezoneEnum } from '../../drizzle/schemas/common/timezones'
import { campaignSource } from '../../drizzle/schemas/main/internal-campaigns'
import { invoiceItemType } from '../../drizzle/schemas/main/invoice-itens'
import { invoiceStatus } from '../../drizzle/schemas/main/invoices'
import { issueActivityType } from '../../drizzle/schemas/main/issue-activities'
import { issuePriority, issueSection, issueStatus, issueType } from '../../drizzle/schemas/main/issues'
import { leadImportStatus } from '../../drizzle/schemas/main/lead-imports'
import { age, disqualifiedType, leadRescheduleReason, leadStatus } from '../../drizzle/schemas/main/leads'
import { paymentStatus } from '../../drizzle/schemas/main/payments'
import { reportStatus, reportType } from '../../drizzle/schemas/main/reports'
import { pauseCancelStatus, pauseCancelType, stopReason } from '../../drizzle/schemas/main/student-cancel-pause-job'
import { studentClassEventTypes } from '../../drizzle/schemas/main/student-class-events'
import { requerimentLevel, studyReason } from '../../drizzle/schemas/main/student-class-experimental-feedbacks'
import { classStatus, classType } from '../../drizzle/schemas/main/student-classes'
import { cancelReason, contractSignStatus, contractStatus } from '../../drizzle/schemas/main/student-contracts'
import { studentEventType } from '../../drizzle/schemas/main/student-history-events'
import { studentTeacherRequestStatus, studentTeacherRequestType } from '../../drizzle/schemas/main/student-teacher-requests'
import { studentStatus } from '../../drizzle/schemas/main/students'
import { teacherType } from '../../drizzle/schemas/main/teacher-contracts'
import { teacherEventType } from '../../drizzle/schemas/main/teacher-history-events'
import { urgencyEnum } from '../../drizzle/schemas/main/teacher-request-types'
import { teacherRequestStatus } from '../../drizzle/schemas/main/teacher-requests'
import { teacherStatus } from '../../drizzle/schemas/main/teachers'

// --- Re-export enum objects (with .enumValues) ---
export {
    age,
    americanTimezone,
    campaignSource,
    cancelReason,
    classStatus,
    classType,
    contractSignStatus,
    contractStatus,
    disqualifiedType,
    documentType,
    gender,
    invoiceItemType,
    invoiceStatus,
    issueActivityType,
    issuePriority,
    issueSection,
    issueStatus,
    issueType,
    languageType,
    leadImportStatus,
    leadRescheduleReason,
    leadStatus,
    level,
    paymentStatus,
    paymentType,
    pauseCancelStatus,
    pauseCancelType,
    permissionType,
    reportStatus,
    reportType,
    requerimentLevel,
    stopReason,
    studentClassEventTypes,
    studentEventType,
    studentStatus,
    studentTeacherRequestStatus,
    studentTeacherRequestType,
    studyReason,
    teacherEventType,
    teacherRequestStatus,
    teacherStatus,
    teacherType,
    urgencyEnum,
    userContextRoleType,
    userType
}

// --- Types from .enumValues ---
export type DocumentType = (typeof documentType.enumValues)[number]
export type LanguageType = (typeof languageType.enumValues)[number]
export type UserType = (typeof userType.enumValues)[number]
export type UserContextRoleType = (typeof userContextRoleType.enumValues)[number]
export type PermissionType = (typeof permissionType.enumValues)[number]
export type Gender = (typeof gender.enumValues)[number]
export type Level = (typeof level.enumValues)[number]
export type PaymentType = (typeof paymentType.enumValues)[number]
export type AmericanTimezone = (typeof americanTimezone.enumValues)[number]

export type LeadStatus = (typeof leadStatus.enumValues)[number]
export type DisqualifiedType = (typeof disqualifiedType.enumValues)[number]
export type Age = (typeof age.enumValues)[number]
export type LeadRescheduleReason = (typeof leadRescheduleReason.enumValues)[number]

export type IssueActivityType = (typeof issueActivityType.enumValues)[number]
export type StudentClassEventType = (typeof studentClassEventTypes.enumValues)[number]
export type ClassStatus = (typeof classStatus.enumValues)[number]
export type ClassType = (typeof classType.enumValues)[number]
export type StudentTeacherRequestStatus = (typeof studentTeacherRequestStatus.enumValues)[number]
export type StudentTeacherRequestType = (typeof studentTeacherRequestType.enumValues)[number]
export type StudentStatus = (typeof studentStatus.enumValues)[number]
export type TeacherStatus = (typeof teacherStatus.enumValues)[number]
export type CampaignSource = (typeof campaignSource.enumValues)[number]
export type TeacherType = (typeof teacherType.enumValues)[number]
export type TeacherEventType = (typeof teacherEventType.enumValues)[number]
export type Urgency = (typeof urgencyEnum.enumValues)[number]
export type TeacherRequestStatus = (typeof teacherRequestStatus.enumValues)[number]
export type CancelReason = (typeof cancelReason.enumValues)[number]
export type ContractSignStatus = (typeof contractSignStatus.enumValues)[number]
export type ContractStatus = (typeof contractStatus.enumValues)[number]
export type StudentEventType = (typeof studentEventType.enumValues)[number]
export type RequerimentLevel = (typeof requerimentLevel.enumValues)[number]
export type StudyReason = (typeof studyReason.enumValues)[number]
export type PauseCancelStatus = (typeof pauseCancelStatus.enumValues)[number]
export type PauseCancelType = (typeof pauseCancelType.enumValues)[number]
export type StopReason = (typeof stopReason.enumValues)[number]
export type IssueType = (typeof issueType.enumValues)[number]
export type IssueStatus = (typeof issueStatus.enumValues)[number]
export type IssuePriority = (typeof issuePriority.enumValues)[number]
export type IssueSection = (typeof issueSection.enumValues)[number]
export type PaymentStatus = (typeof paymentStatus.enumValues)[number]
export type ReportStatus = (typeof reportStatus.enumValues)[number]
export type ReportType = (typeof reportType.enumValues)[number]
export type LeadImportStatus = (typeof leadImportStatus.enumValues)[number]
export type InvoiceItemType = (typeof invoiceItemType.enumValues)[number]
export type InvoiceStatus = (typeof invoiceStatus.enumValues)[number]
