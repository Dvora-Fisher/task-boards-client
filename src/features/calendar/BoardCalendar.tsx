import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/classic'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'
import heLocale from '@fullcalendar/react/locales/he'
import { useState } from 'react'
import { Alert, LinearProgress } from '@mui/material'
import { useCalendar } from './calendarHooks'
import type { DateRange } from '../../types'

interface BoardCalendarProps {
    boardId: string
}

export function BoardCalendar({ boardId }: BoardCalendarProps) {
    const [range, setRange] = useState<DateRange | null>(null)
    const { isFetching, isError } = useCalendar(boardId, range)
    return <>
        {isFetching && <LinearProgress sx={{ mb: 1 }} />}
        {isError && <Alert severity="error" sx={{ mb: 2 }}>לא הצלחנו לטעון את לוח המשימות</Alert>}
        <FullCalendar
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{ start: 'prev,next today', end: 'dayGridMonth,timeGridWeek', center: 'title' }}
            locale={heLocale}
            datesSet={(info) => setRange({ from: info.start.toISOString(), to: info.end.toISOString() })} />
    </>
}