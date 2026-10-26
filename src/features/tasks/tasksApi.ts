import {api} from '../../api/client'
import type { Paginated, Task, CreateTaskInput, TaskListProps } from '../../types'

export function getTasks(boardId: string){
    return api<Paginated<Task>>(`/boards/${boardId}/tasks`)
}

export function createTask(boardId: TaskListProps, input: CreateTaskInput){
    return api<Task>(`/boards/${boardId}/tasks`, {
        method: 'POST',
        body: input,
    })
}