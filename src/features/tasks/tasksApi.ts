import {api} from '../../api/client'
import type { Paginated, Task } from '../../types'

export function getTasks(boardId: string){
    return api<Paginated<Task>>(`/boards/${boardId}/tasks`)
}