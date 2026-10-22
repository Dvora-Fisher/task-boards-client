import type {Audience, UUID, ISODateTime, BaseEntity, PaginationParams, DateRange } from './common'
import type { UserSummary } from './user';
export interface Reminder extends BaseEntity {
  boardId: UUID;
  title: string;
  description: string | null;
  remindAt: ISODateTime;
  audience: Audience;
  createdBy: UserSummary | null;
  recipients: UserSummary[];
}

export interface CreateReminderInput{
    title : string;
    remindAt: ISODateTime;
    description? : string | null;
    audience? : Audience;
    recipientIds?:UUID[]
}

export interface ReminderQueryParams extends PaginationParams, Partial<DateRange>{
    search? : string
}
