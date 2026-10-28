import dayjs from 'dayjs';

export const timeFormat = 'YYYY-MM-DDTHH:mm'

export function formatDateTime(iso: string): string {
    return dayjs(iso).format('DD/MM · HH:mm');
}

export function formatTimeRange(startAt: string, endAt: string): string {
    const start = dayjs(startAt);
    const end = dayjs(endAt);

    if (end.isSame(start, 'day'))
        return `${start.format('DD/MM')} · ${start.format('HH:mm')}–${end.format('HH:mm')}`;

    return `${start.format('DD/MM HH:mm')} – ${end.format('DD/MM HH:mm')}`;
}