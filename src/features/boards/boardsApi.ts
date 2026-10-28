import { api } from '../../api/client'
import type{  Paginated,  Board,  BoardQueryParams, CreateBoardInput, UpdateBoardInput } from '../../types';

export function getBoards(params : BoardQueryParams = {}): Promise<Paginated<Board>>{
    return api<Paginated<Board>>('/boards', {query: params})
}

export function getBoard(boardId: string){
    return api<Board>(`/boards/${boardId}`)
}

export function createBoard(input: CreateBoardInput){
    return api<Board>('/boards',{method: 'POST', body: input})
}

export function updateBoard(boardId: string, input: UpdateBoardInput){
    return api<Board>(`/boards/${boardId}`, {
        method: 'PATCH',
        body: input,
    })
}