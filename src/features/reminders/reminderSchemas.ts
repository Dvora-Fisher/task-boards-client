import { z } from 'zod'
import type { CreateReminderInput, Reminder } from "../../types"
import dayjs from 'dayjs';
import {timeFormat} from '../../utils/timeFormat'

export const reminderSchema = z.object({
    title: z.string().trim().min(1, 'נא להזין כותרת').max(200, 'עד 200 תווים'),
    description: z.string(),
    remindAt: z.string().min(1, 'יש לבחור מועד'),
})

export type ReminderFormValues = z.infer<typeof reminderSchema>

export const emptyReminderValues: ReminderFormValues = {
    title: '',
    description: '',
    remindAt: ''
}

export function toReminderInput(values: ReminderFormValues): CreateReminderInput {
    return {
        title: values.title,
        description: values.description !== '' ? values.description : null,
        remindAt: dayjs(values.remindAt).toISOString()
    }
}

export function toFormValues(reminder: Reminder): ReminderFormValues {
    return {
        title: reminder.title,
        description: reminder.description ?? '',
        remindAt:  dayjs(reminder.remindAt).format(timeFormat)                  
    }
}