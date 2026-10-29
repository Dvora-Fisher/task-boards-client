import { ApiError } from '../api/client';

export const errorMessages: Record<string, string> = {
    USER_NOT_FOUND: 'אין משתמש רשום עם האימייל הזה',
    ALREADY_MEMBER: 'המשתמש כבר חבר בלוח',
    CANNOT_ADD_OWNER: 'ניסית לרשום שוב את בעל הלוח',
    INVALID_CREDENTIALS: 'אימייל או סיסמה שגויים',
    EMAIL_TAKEN: 'האימייל כבר רשום',
    TIME_CONFLICT: "השעה הזו כבר תפוסה בלוח הזה. בחרי שעה אחרת"
}

export function getErrorMessage(error: unknown, fallback: string) : string{
    if( error instanceof ApiError && errorMessages[error.code])
        return errorMessages[error.code]
    return fallback
}