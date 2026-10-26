import { useQuery } from "@tanstack/react-query";
import type { BoardQueryParams } from "../../types";
import { getBoards } from "./boardsApi";

export function useBoards(params : BoardQueryParams = {}){
    return useQuery({
        queryKey: ['boards', params],
        queryFn: () => getBoards(params)
    })
}