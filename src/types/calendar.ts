import type { Audience, UUID, ISODateTime, ISODate, DateRange } from './common'
import type { TaskStatus, TaskPriority } from './task'

export interface CalendarEvent {
    id: UUID;
    type: 'TASK' | 'REMINDER';
    boardId: UUID;
    title: string;
    description: string | null;
    allDay: boolean;               // משימה עם תאריך בלבד
    date: ISODate | null;          // היום של אירוע allDay
    startAt: ISODateTime | null;   // התחלת משימה / מועד תזכורת
    endAt: ISODateTime | null;     // סוף משימה (null לתזכורת)
    blocksTime: boolean;           // רק משימה עם שעות שאינה DONE
    status: TaskStatus | null;     // null לתזכורת
    priority: TaskPriority | null; // null לתזכורת
    audience: Audience;
}

export interface CalendarResponse extends DateRange {
    events: CalendarEvent[]
}
export interface TimeSlot {
    startAt: ISODateTime;
    endAt: ISODateTime
}

export interface SchedulingInput extends DateRange {
    durationMinutes: number;
    maxSuggestions?: number;
    assignedUserId?: UUID
}