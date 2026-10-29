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
import type { EventClickInfo, DayCellInfo, DayHeaderInfo } from '@fullcalendar/react';
import { hebrewDay, hebrewMonth, isHebrewMonthStart } from '../../utils/hebrewDate';
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


/* משבצת יום בתצוגת חודש: המספר הלועזי, ולידו היום העברי (ובתחילת חודש עברי – גם שם החודש) */
function renderDayCell(arg: DayCellInfo) {
    const monthStart = isHebrewMonthStart(arg.date)
    return <span className="day-cell">
        <span className="day-cell__greg">{arg.text}</span>
        <span className={monthStart ? 'day-cell__heb day-cell__heb--month' : 'day-cell__heb'}>
            {monthStart ? `${hebrewDay(arg.date)} ${hebrewMonth(arg.date)}` : hebrewDay(arg.date)}
        </span>
    </span>
}

/* כותרת עמודה: בתצוגת שבוע מוסיפים את התאריך העברי; בתצוגת חודש הכותרת היא רק שם היום */
function renderDayHeader(arg: DayHeaderInfo) {
    if (arg.view.type !== 'timeGridWeek')
        return arg.text
    return <span className="week-head">
        <span>{arg.text}</span>
        <span className="week-head__heb">{hebrewDay(arg.date)} {hebrewMonth(arg.date)}</span>
    </span>
}

export function BoardCalendar({ boardId, canEdit }: BoardCalendarProps) {
    const [range, setRange] = useState<DateRange | null>(null)
    const [selected, setSelected] = useState<SelectedEvent | null>(null)
    const theme = useTheme()
    const colors = {
        task: theme.palette.primary.main,
        reminder: theme.palette.secondary.main,
        done: '#9DB3A1',
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
        <div className="paper-calendar">
            <div className="paper-calendar__frame">
                <FullCalendar
                    plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
                    initialView='dayGridMonth'
                    headerToolbar={{ start: 'prev,next today', end: 'dayGridMonth,timeGridWeek', center: 'title' }}
                    locale={heLocale}
                    datesSet={(info) => setRange({ from: info.start.toISOString(), to: info.end.toISOString() })}
                    events={data ? toCalendarEvents(data.events, colors) : []}
                    eventClick={handleEventClick}
                    height="100%"
                    dayMaxEvents={true}
                    moreLinkClass="more-link"
                    moreLinkContent={(arg) => `+${arg.num} נוספות`}
                    dayCellTopContent={renderDayCell}
                    dayHeaderContent={renderDayHeader}
                />
            </div>
            <div className="calendar-legend" aria-hidden="true">
                <span><i style={{ background: colors.task }} />משימה</span>
                <span><i style={{ background: colors.reminder }} />תזכורת</span>
                <span><i style={{ background: colors.done }} />משימה שבוצעה</span>
            </div>
        </div>
        {selected?.type === 'TASK' &&
            <TaskDetailsDialog boardId={boardId} taskId={selected.id} canEdit={canEdit} onClose={handleClose} />}
        {selected?.type === 'REMINDER' &&
            <ReminderDetailsDialog boardId={boardId} reminderId={selected.id} canEdit={canEdit} onClose={handleClose} />}
    </>
}