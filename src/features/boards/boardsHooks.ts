import { keepPreviousData, useQuery, useMutation } from "@tanstack/react-query";
import type { BoardQueryParams, CreateBoardInput, UpdateBoardInput } from "../../types";
import { getBoards, getBoard, createBoard, updateBoard } from "./boardsApi";
import { useQueryClient } from "@tanstack/react-query";
export function useBoards(params : BoardQueryParams = {}){
    return useQuery({
        queryKey: ['boards', params],
        queryFn: () => getBoards(params),
        placeholderData: keepPreviousData
    })
}

export function useBoard(boardId: string){
    return useQuery({
        queryKey: ['boards', boardId],
        queryFn: () => getBoard(boardId)
    })
}

export function useCreateBoard(){
    const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (input: CreateBoardInput) => createBoard(input),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] })
        })
}

export function useUpdateBoard() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ boardId, input }: { boardId: string, input: UpdateBoardInput }) => updateBoard(boardId, input),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] })

    })
}