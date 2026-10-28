import { z } from 'zod'
import type { CreateTaskInput, Task } from "../../types"
import dayjs from 'dayjs';
import {timeFormat} from '../../utils/timeFormat'
export const taskSchema = z.object({
    title: z.string().trim().min(1, 'נא להזין כותרת').max(200, 'עד 200 תווים'),
    description: z.string(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    scheduleType: z.enum(['NONE', 'DATE', 'TIMED']),
    dueDate: z.string(),
    startAt: z.string(),
    endAt: z.string()
}).refine(
    (data) => data.scheduleType !== "DATE" || !!data.dueDate,
    {
        error: "יש להזין תאריך יעד",
        path: ["dueDate"],
    }
)
    .refine(
        (data) => data.scheduleType !== "TIMED" || !!data.startAt,
        {
            error: "יש להזין שעת התחלה",
            path: ["startAt"],
        }
    )
    .refine(
        (data) => data.scheduleType !== "TIMED" || !!data.endAt,
        {
            error: "יש להזין שעת סיום",
            path: ["endAt"],
        }
    ).refine(
        data => data.scheduleType !== 'TIMED' || !data.startAt || !data.endAt || dayjs(data.endAt).isAfter(dayjs(data.startAt)), {
        error: "שעת הסיום חייבת להיות אחרי שעת ההתחלה",
        path: ["endAt"],
    })


export type TaskFormValues = z.infer<typeof taskSchema>

export const emptyTaskValues: TaskFormValues = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    scheduleType: 'NONE',
    dueDate: '',
    startAt: '',
    endAt: ''
}

export function toTaskInput(values: TaskFormValues): CreateTaskInput {
    return {
        title: values.title,
        description: values.description !== '' ? values.description : null,
        status: values.status,
        priority: values.priority,
        ...(
            values.scheduleType === "NONE"
                ? {
                    dueDate: null,
                    startAt: null,
                    endAt: null,
                }
                : values.scheduleType === "DATE"
                    ? {
                        dueDate: values.dueDate,
                        startAt: null,
                        endAt: null,
                    }
                    : {
                        dueDate: null,
                        startAt: dayjs(values.startAt).toISOString(),
                        endAt: dayjs(values.endAt).toISOString(),
                    }
        )
    }
}

export function toFormValues(task: Task): TaskFormValues {
    return {
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        priority: task.priority,
        scheduleType: task.scheduleType,
        dueDate: task.dueDate ?? '',
        startAt: task.startAt ? dayjs(task.startAt).format(timeFormat) : '',
        endAt: task.endAt ? dayjs(task.endAt).format(timeFormat) : '',
    }
}