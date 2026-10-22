export interface task{
    id:number,
    boardId:number
    title:string,
    description?:string,
    isCompleted:boolean,
    dueDate:string | null,
    reminderAt:string | null,
    createdById:number,
    craetedAt:string
}

export interface createTaskRequest{
    title:string,
    description?:string,
       dueDate?:string | null,
    reminderAt?:string | null
}

export interface UpdateTaskRequest{
    title?:string,
    description?:string,
       dueDate?:string | null,
    reminderAt?:string | null,
    isCompleted?:boolean
}