import { api } from '../../api/client'
import type{  Paginated,  Board,  BoardQueryParams } from '../../types';

export function getBoards(params : BoardQueryParams = {}): Promise<Paginated<Board>>{
    return api<Paginated<Board>>('/boards', {query: params})
}

export function getBoard(boardId: string){
    return api<Board>(`/boards/${boardId}`)
}