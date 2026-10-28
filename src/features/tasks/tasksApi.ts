import {api, MAX_PAGE_SIZE} from '../../api/client'
import type { Paginated, Task, CreateTaskInput, UpdateTaskInput } from '../../types'

export function getTasks(boardId: string){
    return api<Paginated<Task>>(`/boards/${boardId}/tasks`,{
         query: { pageSize: MAX_PAGE_SIZE },
    })
}

export function getTask(taskId: string){
    return api<Task>(`/tasks/${taskId}`)
}

export function createTask(boardId: string, input: CreateTaskInput){
    return api<Task>(`/boards/${boardId}/tasks`, {
        method: 'POST',
        body: input,
    })
}

export function updateTask(taskId: string, input: UpdateTaskInput){
    return api<Task>(`/tasks/${taskId}`, {
        method: 'PATCH',
        body: input,
    })
}

export function deleteTask(taskId: string){
    return api<void>(`/tasks/${taskId}`, {
        method: 'DELETE',
    })
}