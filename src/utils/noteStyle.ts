/*
 * עזרים תצוגתיים בלבד: צבע פתק, הטיה, צבע סיכה ואווטר.
 * הצבע נגזר מה-id, כך שכל לוח שומר על אותו צבע גם אחרי חיפוש או רענון.
 */

export const noteTones = ['yellow', 'pink', 'blue', 'mint'] as const
export type NoteTone = typeof noteTones[number]

const pinTones = ['red', 'green', 'mustard', 'blue'] as const
export type PinTone = typeof pinTones[number]

function hashString(value: string): number {
    let hash = 0
    for (let i = 0; i < value.length; i++)
        hash = (hash * 31 + value.charCodeAt(i)) | 0
    return Math.abs(hash)
}

export function noteToneFor(id: string): NoteTone {
    return noteTones[hashString(id) % noteTones.length]
}

export function pinToneFor(id: string): PinTone {
    return pinTones[hashString(id + 'pin') % pinTones.length]
}

/** הטיה קטנה בין -1.1 ל-1.1 מעלות, כמו פתק שנתלה ביד */
export function tiltFor(id: string): number {
    return ((hashString(id + 'tilt') % 23) - 11) / 10
}

export function avatarToneFor(id: string): number {
    return hashString(id) % 4
}

/** ראשי תיבות: אות ראשונה משתי המילים הראשונות בשם */
export function initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    return parts.slice(0, 2).map((part) => part.charAt(0)).join('')
}
