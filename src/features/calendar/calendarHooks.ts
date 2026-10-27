import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getCalendar } from './calendarApi'
import type { DateRange } from '../../types'

export function useCalendar(boardId: string, range: DateRange | null){
    return useQuery({
        queryKey: ['calendar', boardId, range],
        queryFn: () => getCalendar(boardId, range!),
        enabled: range !== null,
        placeholderData: keepPreviousData
    })
}