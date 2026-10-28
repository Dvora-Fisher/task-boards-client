import type { ChipProps } from '@mui/material'
import type {TaskStatus, TaskPriority, ScheduleType} from '../../types/task'

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

export const scheduleLabels: Record<ScheduleType, string> = {
  NONE: 'ללא תאריך',
  DATE: 'תאריך בלבד',
  TIMED: 'טווח שעות',
};