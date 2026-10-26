import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask } from "./tasksApi";
import type {CreateTaskInput} from '../../types/task'

export function useTasks(boardId: string){
    return useQuery({
        queryKey: ['tasks', boardId],
        queryFn: () => getTasks(boardId)
    })
}

export function useCreateTask(boardId: string){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input) => createTask(boardId, input!),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks', boardId]})
    })
}