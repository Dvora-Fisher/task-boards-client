import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./tasksApi";
import type { Paginated, Task } from "../../types";

export function useTasks(boardId: string){
    return useQuery({
        queryKey: [boardId, 'tasks'],
        queryFn: () => getTasks(boardId)
    })
}