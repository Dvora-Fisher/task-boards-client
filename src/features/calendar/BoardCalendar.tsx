import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/classic'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'
import heLocale from '@fullcalendar/react/locales/he'


interface BoardCalendarProps {
    boardId: string
}

export function BoardCalendar() {
    return <FullCalendar
        plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{ start: 'prev,next today', end: 'dayGridMonth,timeGridWeek', center: 'title' }}
        locale={heLocale} />
}