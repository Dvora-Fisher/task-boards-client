import dayjs from 'dayjs'
import { HDate, gematriya } from '@hebcal/core'

/* מחרוזת "YYYY-MM-DD" נקראת כחצות בשעון המקומי, ולא כ-UTC */
function toLocalDate(date: Date | string): Date {
    return typeof date === 'string' ? dayjs(date).toDate() : date
}

/* תאריך עברי מלא, למשל: כ״ז חשון תשפ״ז */
export function formatHebrewDate(date: Date | string): string {
    return new HDate(toLocalDate(date)).renderGematriya(true)
}

/* היום בחודש העברי באותיות, למשל: כ״ז */
export function hebrewDay(date: Date): string {
    return gematriya(new HDate(date).getDate())
}

/* שם החודש העברי בלי היום והשנה, למשל: חשון, אדר א׳ */
export function hebrewMonth(date: Date): string {
    const parts = formatHebrewDate(date).split(' ')
    return parts.slice(1, -1).join(' ')
}

export function isHebrewMonthStart(date: Date): boolean {
    return new HDate(date).getDate() === 1
}