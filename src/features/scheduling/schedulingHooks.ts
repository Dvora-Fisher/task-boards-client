import { useMutation } from '@tanstack/react-query'
import { getSuggestions } from './schedulingApi'
import type { SchedulingInput } from '../../types'

export function useSuggestions(boardId: string) {
    return useMutation({
        mutationFn: (input: SchedulingInput) => getSuggestions(boardId, input),
    })
}