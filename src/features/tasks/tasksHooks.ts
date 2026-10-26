import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./tasksApi";

export function useTasks(boardId: string){
    return useQuery({
        queryKey: ['tasks', boardId],
        queryFn: () => getTasks(boardId)
    })
}