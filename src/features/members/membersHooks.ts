import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import {addMember, getMembers, removeMember} from './membersApi'

export function useMembers(boardId: string) {
    return useQuery({
        queryKey: ['members', boardId],
        queryFn: () => getMembers(boardId)
    })
}

export function useAddMember(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (email: string) => addMember(boardId, email),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['members', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['boards'] })])
    })
}

export function useRemoveMember(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ( userId: string ) => removeMember(boardId, userId),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['members', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['boards'] })])
    })
}