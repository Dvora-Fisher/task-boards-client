import type { PaginationParams, ISODateTime, BaseEntity } from './common'
import type { UserSummary } from './user';

export type BoardVisibility = 'PRIVATE' | 'SHARED';

export interface Board extends BaseEntity{
    name: string;
    description: string | null;
    visibility: BoardVisibility;
    isOpen: boolean;            // לוח משותף: true = החברים עורכים, false = רק צופים
    owner: UserSummary;
    memberCount: number;        // לא כולל הבעלים
    shareToken: string | null;  // מוחזר רק לבעלים של לוח משותף
    myAccess: BoardAccess;
}

export interface BoardAccess {
    isOwner: boolean;   // אני הבעלים
    isMember: boolean;  // אני חברה בלוח משותף
    canView: boolean;
    canEdit: boolean;   // מותר להוסיף/לערוך/למחוק משימות ותזכורות
    canManage: boolean; // מותר לשנות הגדרות, קישור וחברים (בעלים בלבד)
}

export interface Member {
    user: UserSummary;
    isOwner: boolean;
    joinedAt: ISODateTime
}

export interface CreateBoardInput{
    name: string;
    description? : string | null;
    visibility? : BoardVisibility;
    isOpen? : boolean
}

export interface BoardQueryParams extends PaginationParams{
    visibility? : BoardVisibility;
    search? : string;
    role? : 'owner' | 'member'
}




