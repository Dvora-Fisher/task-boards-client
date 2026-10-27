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
import type { DateRange } from '../../types'
import { toCalendarEvents } from './calendarEvents'
import type { EventClickInfo } from '@fullcalendar/react';
import { TaskDetailsDialog } from '../tasks/TaskDetailsDialog';

interface BoardCalendarProps {
    boardId: string,
    canEdit: boolean
}

export function BoardCalendar({ boardId, canEdit }: BoardCalendarProps) {
    const [range, setRange] = useState<DateRange | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const theme = useTheme()
    const colors = {
        task: theme.palette.primary.main,
        reminder: theme.palette.secondary.main,
        done: theme.palette.grey[400],
    }
    const { isFetching, isError, data } = useCalendar(boardId, range)
    function handleEventClick(info: EventClickInfo){
        const {type, entityId} = info.event.extendedProps
        if(type === 'TASK')
            setSelectedTaskId(entityId)
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
            events={data? toCalendarEvents(data.events, colors) : []}
            eventClick={handleEventClick}
            />
        {selectedTaskId && <TaskDetailsDialog boardId={boardId} taskId={selectedTaskId} canEdit={canEdit} onClose={()=>setSelectedTaskId(null)}/>}
    </>
}