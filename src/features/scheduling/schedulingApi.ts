import { api } from '../../api/client'
import type { SchedulingInput, TimeSlot } from '../../types'

export function getSuggestions(boardId: string, input: SchedulingInput) {
    return api<{ suggestions: TimeSlot[] }>(`/boards/${boardId}/scheduling/suggestions`, {
        method: 'POST',
        body: input,
    })
}