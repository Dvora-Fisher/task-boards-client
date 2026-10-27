import type { EventInput } from '@fullcalendar/react'
import type { CalendarEvent, Reminder } from '../../types'
import { Title } from '@mui/icons-material'

export interface EventColors {
    done: string,
    reminder: string,
    task: string
}

export function toCalendarEvents(events: CalendarEvent[], colors: EventColors): EventInput[] {
    return events.map((e) => ({
        id: `${e.type}-${e.id}`,
        title: e.type === 'REMINDER'
            ? `🔔 ${e.title}`
            : e.title,

        allDay: e.allDay,
        start: (e.allDay ? e.date : e.startAt) ?? undefined,
        end: e.endAt ?? undefined,
        color: e.type === 'REMINDER'
            ? colors.reminder
            : e.status === 'DONE'
                ? colors.done
                : colors.task,
        extendedProps: {
            type: e.type,
            entityId: e.id,
        },
    }));
}