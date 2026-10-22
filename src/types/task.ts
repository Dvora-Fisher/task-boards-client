import type { Audience, UUID, ISODateTime, ISODate, BaseEntity, PaginationParams, DateRange } from "./common";
import type { UserSummary } from "./user";

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type ScheduleType = 'NONE' | 'DATE' | 'TIMED';

export interface Task extends BaseEntity {
    boardId: UUID;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    audience: Audience;
    scheduleType: ScheduleType;
    dueDate: ISODate | null;        // משימה לכל היום
    startAt: ISODateTime | null;    // משימה עם שעות
    endAt: ISODateTime | null;
    createdBy: UserSummary | null;
    assignees: UserSummary[];
}

export interface CreateTaskInput {
    title: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    audience?: Audience;
    assigneeIds?: UUID[] | null;
    dueDate?: ISODate | null;
    startAt?: ISODateTime | null;
    endAt?: ISODateTime | null;
}

export interface TasksQueryParams extends PaginationParams, Partial<DateRange> {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    schedule?: ScheduleType;
    search?: string;
    assignedToMe?: boolean;
    sort?: 'createdAt' | 'updatedAt' | 'title' | 'startAt' | 'dueDate';
    order?: 'asc' | 'desc'

}


