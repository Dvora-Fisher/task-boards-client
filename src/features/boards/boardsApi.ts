import { api } from '../../api/client'
import type{  Paginated,  Board,  BoardQueryParams } from '../../types';

export function getBoards(params : BoardQueryParams = {}): Promise<Paginated<Board>>{
    return api<Paginated<Board>>('/boards', {query: params})
}