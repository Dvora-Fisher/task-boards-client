import dayjs, { type Dayjs } from 'dayjs';
import { formatHebrewDayMonth } from './hebrewDate';

export const timeFormat = 'YYYY-MM-DDTHH:mm'

/* "02/11 · א׳ כסלו" – תאריך לועזי קצר ולידו היום והחודש העבריים */
function formatDay(day: Dayjs): string {
    return `${day.format('DD/MM')} · ${formatHebrewDayMonth(day.toDate())}`
}

/* רגע בודד (תזכורת): "02/11 · א׳ כסלו · 18:00" */
export function formatDateTime(iso: string): string {
    const moment = dayjs(iso);
    return `${formatDay(moment)} · ${moment.format('HH:mm')}`;
}

/* טווח (משימה עם שעות): "02/11 · א׳ כסלו · 11:00–12:30", ואם הוא חוצה יום – התאריך בשני הצדדים */
export function formatTimeRange(startAt: string, endAt: string): string {
    const start = dayjs(startAt);
    const end = dayjs(endAt);

    if (end.isSame(start, 'day'))
        return `${formatDay(start)} · ${start.format('HH:mm')}–${end.format('HH:mm')}`;

    return `${formatDay(start)} ${start.format('HH:mm')} – ${formatDay(end)} ${end.format('HH:mm')}`;
}