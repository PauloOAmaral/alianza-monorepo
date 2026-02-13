import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, ilike, inArray, isNull } from '@alianza/database/drizzle'
import { countries, leads, studentClasses, teacherAvailabilities, teachers } from '@alianza/database/schemas/admin'
import { ageValues, studyReasonValues } from '@alianza/database/types/enum'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const scheduleExperimentalClassSchema = z.object({
    leadId: z.string().min(1),
    teacherId: z.string().min(1),
    classDate: z.coerce.date(),
    classTime: z.string().regex(/^\d{2}:\d{2}$/),
    disciplineId: z.string().min(1),
    age: z.enum(ageValues),
    studyReason: z.enum(studyReasonValues),
    observation: z.string().max(1000).optional().nullable(),
    countryId: z.string().min(1),
    city: z.string().min(1).max(120)
})

function parseTimeToMinutes(time: string): number {
    const [hours = '0', minutes = '0'] = time.split(':')
    return Number(hours) * 60 + Number(minutes)
}

function combineUtcDateAndTime(date: Date, time: string): Date {
    const [hours = '0', minutes = '0'] = time.split(':')
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), Number(hours), Number(minutes), 0, 0))
}

export const scheduleExperimentalClassCommand = createAction({ schema: scheduleExperimentalClassSchema })
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const scheduledAt = combineUtcDateAndTime(data.classDate, data.classTime)
        const now = new Date()

        if (scheduledAt <= now) {
            throw new ApplicationError('commonExperimentalScheduleDateInPast')
        }

        const [lead, teacher, country, existingClass] = await Promise.all([
            db.query.leads.findFirst({
                columns: { id: true, isActiveFrom: true, status: true },
                where: and(isNull(leads.deletedAt), eq(leads.id, data.leadId))
            }),
            db.query.teachers.findFirst({
                columns: { id: true, status: true, classLink: true },
                where: and(isNull(teachers.deletedAt), eq(teachers.id, data.teacherId))
            }),
            db.query.countries.findFirst({
                columns: { id: true, countryAlpha2Code: true },
                where: and(isNull(countries.deletedAt), eq(countries.id, data.countryId))
            }),
            db.query.studentClasses.findFirst({
                columns: { id: true },
                where: and(isNull(studentClasses.deletedAt), eq(studentClasses.leadId, data.leadId))
            })
        ])

        if (!lead) {
            throw new ApplicationError('commonExperimentalScheduleLeadNotFound')
        }

        if (!lead.isActiveFrom || lead.status === 'disqualified') {
            throw new ApplicationError('commonExperimentalScheduleLeadInactive')
        }

        if (!teacher) {
            throw new ApplicationError('commonExperimentalScheduleTeacherNotFound')
        }

        if (teacher.status !== 'active') {
            throw new ApplicationError('commonExperimentalScheduleTeacherInactive')
        }

        if (!country) {
            throw new ApplicationError('commonExperimentalScheduleCountryNotFound')
        }

        if (existingClass) {
            throw new ApplicationError('commonExperimentalScheduleAlreadyExists')
        }

        const weekday = scheduledAt.getUTCDay()
        const selectedMinutes = parseTimeToMinutes(data.classTime)

        const availabilities = await db.query.teacherAvailabilities.findMany({
            columns: { startTime: true, endTime: true },
            where: and(
                isNull(teacherAvailabilities.deletedAt),
                eq(teacherAvailabilities.teacherId, data.teacherId),
                eq(teacherAvailabilities.dayOfWeek, weekday)
            )
        })

        const isAvailable = availabilities.some(availability => {
            const start = parseTimeToMinutes(availability.startTime)
            const end = parseTimeToMinutes(availability.endTime)
            return selectedMinutes >= start && selectedMinutes + 60 <= end
        })

        if (!isAvailable) {
            throw new ApplicationError('commonExperimentalScheduleTeacherUnavailable')
        }

        const conflictingClass = await db.query.studentClasses.findFirst({
            columns: { id: true },
            where: and(
                isNull(studentClasses.deletedAt),
                eq(studentClasses.teacherId, data.teacherId),
                eq(studentClasses.classDate, scheduledAt),
                inArray(studentClasses.status, ['scheduled', 'awaiting_student_approval'])
            )
        })

        if (conflictingClass) {
            throw new ApplicationError('commonExperimentalScheduleTimeBusy')
        }

        const countryPrefix = country.countryAlpha2Code.toUpperCase()
        const pattern = `%country_id:${country.id}%`
        const count = await db.$count(
            studentClasses,
            and(isNull(studentClasses.deletedAt), eq(studentClasses.type, 'experimental'), ilike(studentClasses.observation, pattern))
        )
        const sequence = String(count + 1).padStart(6, '0')
        const scheduleCode = `LD${countryPrefix}${sequence}`

        const observationLines = [
            `schedule_code:${scheduleCode}`,
            `country_id:${country.id}`,
            `city:${data.city}`,
            `study_reason:${data.studyReason}`,
            data.observation?.trim() ? `observation:${data.observation.trim()}` : null
        ].filter(Boolean)

        const [createdClass] = await db
            .insert(studentClasses)
            .values({
                leadId: data.leadId,
                teacherId: data.teacherId,
                disciplineId: data.disciplineId,
                classDate: scheduledAt,
                duration: 60,
                classLink: teacher.classLink ?? null,
                status: 'scheduled',
                type: 'experimental',
                observation: observationLines.join('\n')
            })
            .returning({ id: studentClasses.id })

        if (!createdClass) {
            throw new ApplicationError('unexpectedError')
        }

        await db
            .update(leads)
            .set({
                status: 'experimental_class',
                disciplineId: data.disciplineId,
                age: data.age
            })
            .where(eq(leads.id, data.leadId))

        return {
            classId: createdClass.id,
            scheduleCode
        }
    })

export type ScheduleExperimentalClassCommandResult = Awaited<ReturnType<typeof scheduleExperimentalClassCommand>>['data']
