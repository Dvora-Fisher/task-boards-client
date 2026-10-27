import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, updateTask, deleteTask } from "./tasksApi";
import type {CreateTaskInput, UpdateTaskInput } from '../../types/task'

export function useTasks(boardId: string){
    return useQuery({
        queryKey: ['tasks', boardId],
        queryFn: () => getTasks(boardId)
    })
}

export function useCreateTask(boardId: string){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: CreateTaskInput) => createTask(boardId, input),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks', boardId]})
    })
}

export function useUpdateTask(boardId: string){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({taskId,input}:{taskId: string, input: UpdateTaskInput}) => updateTask(taskId, input),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks', boardId]})
    })
}

export function useDeleteTask(boardId: string){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks', boardId]})
    })
}