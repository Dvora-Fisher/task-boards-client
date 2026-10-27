import { api } from '../../api/client'
import type { CalendarResponse, DateRange } from '../../types'

export function getCalendar(boardId:string, range: DateRange){
    return api<CalendarResponse>(`/boards/${boardId}/calendar`,{query: range})
}