import { cn } from '@alianza/ui/utils'
import type { TFunction } from 'i18next'

const getWorkflowStatusColor = (status: string | null | undefined) => {
    if (!status) return 'text-gray-500 bg-gray-100 border border-gray-200'

    const colorMap: Record<string, string> = {
        started: 'text-blue-500 bg-blue-100 border border-blue-200',
        in_progress: 'text-blue-500 bg-blue-100 border border-blue-200',
        in_progress_delayed: 'text-orange-500 bg-orange-100 border border-orange-200',
        completed: 'text-green-500 bg-green-100 border border-green-200',
        pending: 'text-yellow-500 bg-yellow-100 border border-yellow-200',
        rejected: 'text-red-500 bg-red-100 border border-red-200',
        cancelled: 'text-red-500 bg-red-100 border border-red-200',
        deleted: 'text-gray-500 bg-gray-100 border border-gray-200'
    }

    return colorMap[status] || 'text-gray-500 bg-gray-100 border border-gray-200'
}

const getWorkflowTextColor = (status: string | null | undefined) => {
    if (!status) return 'text-gray-500'

    const colorMap: Record<string, string> = {
        started: 'text-blue-500',
        in_progress: 'text-blue-500',
        in_progress_delayed: 'text-orange-500',
        completed: 'text-green-500',
        pending: 'text-yellow-500',
        rejected: 'text-red-500',
        cancelled: 'text-red-500',
        deleted: 'text-gray-500'
    }

    return colorMap[status] || 'text-gray-500'
}

const getWorkflowDotColor = (status: string | null | undefined) => {
    const baseClass = 'w-3 h-3 rounded-full'

    if (!status) return cn(baseClass, 'bg-gray-50')

    const colorMap: Record<string, string> = {
        started: cn(baseClass, 'bg-blue-500 animate-pulse'),
        in_progress: cn(baseClass, 'bg-blue-500 animate-pulse'),
        in_progress_delayed: cn(baseClass, 'bg-orange-500 animate-pulse'),
        completed: cn(baseClass, 'bg-green-500'),
        pending: cn(baseClass, 'bg-yellow-500'),
        rejected: cn(baseClass, 'bg-red-500'),
        cancelled: cn(baseClass, 'bg-red-500'),
        deleted: cn(baseClass, 'bg-gray-500')
    }

    return colorMap[status] || cn(baseClass, 'bg-gray-50')
}

const getWorkflowNodeTextColor = (status: string | null | undefined): string => {
    if (!status) return 'text-gray-500'

    const colorMap: Record<string, string> = {
        current: 'text-blue-500',
        current_delayed: 'text-orange-500',
        completed: 'text-green-500',
        canceled: 'text-red-500',
        returned: 'text-yellow-500'
    }

    return colorMap[status] || 'text-gray-500'
}

const getWorkflowNodeStatusColor = (status: string | null | undefined): string => {
    if (!status) return 'text-gray-500 bg-gray-100 border border-gray-200'

    const colorMap: Record<string, string> = {
        current: 'text-blue-500 bg-blue-100 border border-blue-200',
        current_delayed: 'text-orange-500 bg-orange-100 border border-orange-200',
        completed: 'text-green-500 bg-green-100 border border-green-200',
        canceled: 'text-red-500 bg-red-100 border border-red-200',
        returned: 'text-yellow-500 bg-yellow-100 border border-yellow-200'
    }

    return colorMap[status] || 'text-gray-500 bg-gray-100 border border-gray-200'
}

const getWorkflowNodeDotColor = (status: string | null | undefined): string => {
    const baseClass = 'w-3 h-3 rounded-full'

    if (!status) return cn(baseClass, 'bg-gray-50')

    const colorMap: Record<string, string> = {
        current: cn(baseClass, 'bg-blue-500 animate-pulse'),
        current_delayed: cn(baseClass, 'bg-orange-500 animate-pulse'),
        completed: cn(baseClass, 'bg-green-500'),
        canceled: cn(baseClass, 'bg-red-500'),
        returned: cn(baseClass, 'bg-yellow-500')
    }

    return colorMap[status] || cn(baseClass, 'bg-gray-50')
}

const getWorkflowNodeStatusInfo = (status: string | null | undefined, t: TFunction) => {
    if (!status) return t('common.workflowNodeStatus.notStarted')

    switch (status) {
        case 'current':
            return t('common.workflowNodeStatus.current')
        case 'current_delayed':
            return t('common.workflowNodeStatus.currentDelayed')
        case 'completed':
            return t('common.workflowNodeStatus.completed')
        case 'canceled':
            return t('common.workflowNodeStatus.canceled')
        case 'returned':
            return t('common.workflowNodeStatus.returned')
        default:
            return t('common.workflowNodeStatus.notStarted')
    }
}

const getWorkflowStatusInfo = (status: string | null | undefined, t: TFunction) => {
    if (!status) return t('common.workflowInstanceStatus.notStarted')

    switch (status) {
        case 'started':
            return t('common.workflowInstanceStatus.started')
        case 'in_progress':
            return t('common.workflowInstanceStatus.inProgress')
        case 'in_progress_delayed':
            return t('common.workflowInstanceStatus.inProgressDelayed')
        case 'completed':
            return t('common.workflowInstanceStatus.completed')
        default:
            return t('common.workflowInstanceStatus.notStarted')
    }
}

export {
    getWorkflowStatusColor,
    getWorkflowDotColor,
    getWorkflowTextColor,
    getWorkflowNodeStatusInfo,
    getWorkflowNodeTextColor,
    getWorkflowNodeStatusColor,
    getWorkflowNodeDotColor,
    getWorkflowStatusInfo
}
