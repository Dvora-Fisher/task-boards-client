import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, updateTask, deleteTask, getTask } from "./tasksApi";
import type { CreateTaskInput, UpdateTaskInput } from '../../types/task'

export function useTasks(boardId: string) {
    return useQuery({
        queryKey: ['tasks', boardId],
        queryFn: () => getTasks(boardId)
    })
}

export function useTask(boardId: string, taskId: string) {
    return useQuery({
        queryKey: ['tasks', boardId, taskId],
        queryFn: () => getTask(taskId)
    })
}

export function useCreateTask(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: CreateTaskInput) => createTask(boardId, input),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['tasks', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}

export function useUpdateTask(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ taskId, input }: { taskId: string, input: UpdateTaskInput }) => updateTask(taskId, input),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['tasks', boardId] }),
            queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}

export function useDeleteTask(boardId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => Promise.all([
                queryClient.invalidateQueries({ queryKey: ['tasks', boardId], exact:true }),
                queryClient.invalidateQueries({ queryKey: ['calendar', boardId] })])
    })
}