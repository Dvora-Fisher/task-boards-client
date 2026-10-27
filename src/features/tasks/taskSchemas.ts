import { z } from 'zod'
import type { CreateTaskInput } from "../../types"

export const taskSchema = z.object({
    title: z.string().trim().min(1, 'נא להזין כותרת').max(200, 'עד 200 תווים'),
    description: z.string(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    scheduleType: z.enum(['NONE', 'DATE']),
    dueDate: z.string(),
}).refine(
    (data) => data.scheduleType !== 'DATE' || data.dueDate != '',
    {
        error: 'נא לבחור תאריך',
        path: ['dueDate']
    }
)

export type TaskFormValues = z.infer<typeof taskSchema>

export function toTaskInput(values: TaskFormValues): CreateTaskInput{
    return {
        title: values.title,
        description: values.description !== '' ? values.description : null,
        status: values.status,
        priority: values.priority,
        dueDate: values.scheduleType === 'DATE'? values.dueDate : null,
    }
}