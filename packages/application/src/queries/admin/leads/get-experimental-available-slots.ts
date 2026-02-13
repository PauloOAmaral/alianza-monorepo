import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, gte, inArray, isNull, lt } from '@alianza/database/drizzle'
import { studentClasses, teacherAvailabilities, teachers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const schema = z.object({
    teacherId: z.string().min(1),
    date: z.string().date()
})

function parseTimeToMinutes(time: string): number {
    const [hours = '0', minutes = '0'] = time.split(':')
    return Number(hours) * 60 + Number(minutes)
}

function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

function getUtcDayOfWeek(isoDate: string): number {
    return new Date(`${isoDate}T00:00:00.000Z`).getUTCDay()
}

function getUtcDayRange(isoDate: string): { start: Date; end: Date } {
    const start = new Date(`${isoDate}T00:00:00.000Z`)
    const end = new Date(start)
    end.setUTCDate(end.getUTCDate() + 1)
    return { start, end }
}

export const getExperimentalAvailableSlotsQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const teacher = await db.query.teachers.findFirst({
            columns: { id: true, status: true },
            where: (table, { and, eq, isNull }) => and(isNull(table.deletedAt), eq(table.id, data.teacherId))
        })

        if (!teacher) {
            throw new ApplicationError('commonExperimentalScheduleTeacherNotFound')
        }

        if (teacher.status !== 'active') {
            throw new ApplicationError('commonExperimentalScheduleTeacherInactive')
        }

        const dayOfWeek = getUtcDayOfWeek(data.date)
        const { start, end } = getUtcDayRange(data.date)

        const [availabilities, bookedClasses] = await Promise.all([
            db.query.teacherAvailabilities.findMany({
                columns: { startTime: true, endTime: true },
                where: and(
                    isNull(teacherAvailabilities.deletedAt),
                    eq(teacherAvailabilities.teacherId, data.teacherId),
                    eq(teacherAvailabilities.dayOfWeek, dayOfWeek)
                )
            }),
            db.query.studentClasses.findMany({
                columns: { classDate: true },
                where: and(
                    isNull(studentClasses.deletedAt),
                    eq(studentClasses.teacherId, data.teacherId),
                    gte(studentClasses.classDate, start),
                    lt(studentClasses.classDate, end),
                    inArray(studentClasses.status, ['scheduled', 'awaiting_student_approval'])
                )
            })
        ])

        const now = new Date()
        const isToday = start <= now && now < end
        const currentMinute = now.getUTCHours() * 60 + now.getUTCMinutes()

        const occupiedTimes = new Set(
            bookedClasses.map(item => {
                const date = item.classDate
                return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`
            })
        )

        const availableTimes = new Set<string>()

        for (const availability of availabilities) {
            const startMinutes = parseTimeToMinutes(availability.startTime)
            const endMinutes = parseTimeToMinutes(availability.endTime)

            for (let minute = startMinutes; minute + 60 <= endMinutes; minute += 30) {
                if (isToday && minute <= currentMinute) {
                    continue
                }

                const slot = minutesToTime(minute)

                if (!occupiedTimes.has(slot)) {
                    availableTimes.add(slot)
                }
            }
        }

        const slots = Array.from(availableTimes)
            .sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b))
            .map(slot => ({
                id: slot,
                name: slot
            }))

        return { slots }
    })

export type GetExperimentalAvailableSlotsQuery = Awaited<ReturnType<typeof getExperimentalAvailableSlotsQuery>>
