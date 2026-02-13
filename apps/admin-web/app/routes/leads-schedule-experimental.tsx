import { scheduleExperimentalClassCommand } from '@alianza/application/commands/admin'
import { ApplicationError } from '@alianza/application/error'
import { getCountryOptionsQuery, getDisciplineOptionsQuery, getExperimentalAvailableSlotsQuery, getLeadByIdQuery, getActiveTeacherOptionsQuery } from '@alianza/application/queries/admin'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { data } from 'react-router'
import { LeadScheduleExperimentalDialog } from '~/features/leadsScheduleExperimental/schedule-dialog'
import { scheduleExperimentalClassSchema } from '~/features/leadsScheduleExperimental/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/leads-schedule-experimental'

export async function action({ request, params }: Route.ActionArgs) {
    await requireSession(request)

    const { t } = await getI18nextServerInstance(request)
    const formData = await request.formData()
    const intent = String(formData.get('intent') ?? '')

    if (intent === 'availability') {
        const teacherId = String(formData.get('teacherId') ?? '')
        const classDateRaw = String(formData.get('classDate') ?? '')
        const classDate = classDateRaw.slice(0, 10)

        if (!teacherId || !classDate) {
            return data({ status: 'availability', slots: [] }, { status: 200 })
        }

        try {
            const result = await getExperimentalAvailableSlotsQuery(
                createRequest(request, {
                    teacherId,
                    date: classDate
                })
            )

            return data({ status: 'availability', slots: result.data.slots }, { status: 200 })
        } catch {
            return data({ status: 'availability', slots: [] }, { status: 200 })
        }
    }

    const { success, value, errors } = await parseFormDataWithZod(formData, scheduleExperimentalClassSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.unexpectedError'))
        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    try {
        const result = await scheduleExperimentalClassCommand(
            createRequest(request, {
                leadId: params.id,
                teacherId: value.teacherId,
                classDate: value.classDate,
                classTime: value.classTime,
                disciplineId: value.disciplineId,
                age: value.age,
                studyReason: value.studyReason,
                observation: value.observation ?? null,
                countryId: value.countryId,
                city: value.city
            })
        )

        return await dataWithSuccess(
            {
                status: 'scheduled',
                scheduleCode: result.data.scheduleCode,
                classId: result.data.classId
            },
            t('dialogs.leads.schedule.success')
        )
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('errors.unexpectedError'))
    }
}

export async function loader({ request, params }: Route.LoaderArgs) {
    await requireSession(request)

    return {
        lead: getLeadByIdQuery(createRequest(request, { id: params.id })),
        teachers: getActiveTeacherOptionsQuery(request),
        disciplines: getDisciplineOptionsQuery(request),
        countries: getCountryOptionsQuery(request)
    }
}

export default LeadScheduleExperimentalDialog
