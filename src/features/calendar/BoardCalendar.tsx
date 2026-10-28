import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/monarch'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/monarch/theme.css'
import '@fullcalendar/react/themes/monarch/palettes/blue.css'
import heLocale from '@fullcalendar/react/locales/he'
import { useState } from 'react'
import { Alert, LinearProgress, useTheme } from '@mui/material'
import { useCalendar } from './calendarHooks'
import type { CalendarEvent, DateRange } from '../../types'
import { toCalendarEvents } from './calendarEvents'
import type { EventClickInfo } from '@fullcalendar/react';
import { TaskDetailsDialog } from '../tasks/TaskDetailsDialog';
import { ReminderDetailsDialog } from '../reminders/ReminderDetailsDialog';

interface BoardCalendarProps {
    boardId: string,
    canEdit: boolean
}

interface SelectedEvent {
    type: CalendarEvent['type'],
    id: string
}

export function BoardCalendar({ boardId, canEdit }: BoardCalendarProps) {
    const [range, setRange] = useState<DateRange | null>(null)
    const [selected, setSelected] = useState<SelectedEvent | null>(null)
    const theme = useTheme()
    const colors = {
        task: theme.palette.primary.main,
        reminder: theme.palette.secondary.main,
        done: theme.palette.grey[400],
    }
    const { isFetching, isError, data } = useCalendar(boardId, range)
    function handleEventClick(info: EventClickInfo) {
        const { type, entityId } = info.event.extendedProps
        setSelected({ type, id: entityId })
    }
    function handleClose() {
        setSelected(null)
    }

    return <>
        {isFetching && <LinearProgress sx={{ mb: 1 }} />}
        {isError && <Alert severity="error" sx={{ mb: 2 }}>לא הצלחנו לטעון את לוח המשימות</Alert>}
        <FullCalendar
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{ start: 'prev,next today', end: 'dayGridMonth,timeGridWeek', center: 'title' }}
            locale={heLocale}
            datesSet={(info) => setRange({ from: info.start.toISOString(), to: info.end.toISOString() })}
            events={data ? toCalendarEvents(data.events, colors) : []}
            eventClick={handleEventClick}
        />
        {selected?.type === 'TASK' &&
            <TaskDetailsDialog boardId={boardId} taskId={selected.id} canEdit={canEdit} onClose={handleClose} />}
        {selected?.type === 'REMINDER' &&
            <ReminderDetailsDialog boardId={boardId} reminderId={selected.id} canEdit={canEdit} onClose={handleClose} />}
    </>
}