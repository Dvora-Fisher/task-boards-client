import { useQuery } from "@tanstack/react-query";
import type { BoardQueryParams } from "../../types";
import { getBoards, getBoard } from "./boardsApi";

export function useBoards(params : BoardQueryParams = {}){
    return useQuery({
        queryKey: ['boards', params],
        queryFn: () => getBoards(params)
    })
}

export function useBoard(boardId: string){
    return useQuery({
        queryKey: ['boards', boardId],
        queryFn: () => getBoard(boardId)
    })
}