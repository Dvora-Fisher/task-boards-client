import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateReminderInput, UpdateReminderInput } from '../../types/reminder'
import { createReminder, deleteReminder, getReminder, getReminders, updateReminder } from "./remindersApi";

export function useReminders(boardId: string) {
    return useQuery({
        queryKey: ['reminders', boardId],
        queryFn: () => getReminders(boardId)
    })
}

export function useReminder(boardId: string, reminderId: string) {
    return useQuery({
        queryKey: ['reminders', boardId, reminderId],
        queryFn: () => getReminder(reminderId)
    })
}

export function useCreateReminder(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: CreateReminderInput) => createReminder(boardId, input),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['reminders', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}

export function useUpdateReminder(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ reminderId, input }: { reminderId: string, input: UpdateReminderInput }) => updateReminder(reminderId, input),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['reminders', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}

export function useDeleteReminder(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (reminderId: string) => deleteReminder(reminderId),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['reminders', boardId], exact: true }),
            queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}
