export type UUID = string;
export type ISODateTime = string; // "2026-11-02T09:00:00.000Z"
export type ISODate = string;     // "2026-11-02"
export type Audience = 'BOARD' | 'SELECTED'
export interface BaseEntity {
    createdAt: ISODateTime;
    id: UUID;
    updatedAt: ISODateTime
}
export interface DateRange {
    from: ISODateTime;
    to: ISODateTime
}
export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number
}
export interface Paginated<T> {
    items: T[];
    pagination: Pagination
}
export interface PaginationParams {
    page?: number;
    pageSize? : number
}
export interface ApiSuccess<T>{
    success : true;
    data : T
}
export interface ApiErrorBody{
    success: false;
    error : {
        code : ErrorCode;
        message: string;
        details? : unknown
    }
}
export type ErrorCode = | 'VALIDATION_ERROR' | 'INVALID_JSON' | 'UNAUTHORIZED' | 'INVALID_TOKEN' | 'INVALID_CREDENTIALS'
  | 'FORBIDDEN' | 'NOT_FOUND' | 'BOARD_NOT_FOUND' | 'TASK_NOT_FOUND' | 'REMINDER_NOT_FOUND'
  | 'USER_NOT_FOUND' | 'MEMBER_NOT_FOUND' | 'EMAIL_TAKEN' | 'ALREADY_MEMBER' | 'BOARD_IS_PRIVATE'
  | 'BOARD_HAS_MEMBERS' | 'CANNOT_ADD_OWNER' | 'CANNOT_REMOVE_OWNER' | 'NOT_A_BOARD_MEMBER'
  | 'TIME_CONFLICT' | 'RATE_LIMITED' | 'DATABASE_UNAVAILABLE' | 'INTERNAL_ERROR';