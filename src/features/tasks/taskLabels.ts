import type { ChipProps } from '@mui/material'
import type {TaskStatus, TaskPriority} from '../../types/task'

export const statusLabels : Record<TaskStatus, string> = {
    'TODO': 'לביצוע',
    'IN_PROGRESS': 'בתהליך',
    'DONE': 'בוצע'
}

export const priorityLabels: Record<TaskPriority, string> = {
    'HIGH': 'גבוהה',
    'MEDIUM': 'בינונית',
    'LOW': 'נמוכה'
}

export const statusColors: Record<TaskStatus, ChipProps['color']> = {
    TODO: 'default',
    IN_PROGRESS: 'warning',
    DONE: 'success'
}