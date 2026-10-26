import { api } from '../../api/client'
import { type Paginated, type Board, type BoardQueryParams } from '../../types';

export function getBoards(params : BoardQueryParams = {}): Promise<Paginated<Board>>{
    return api<Paginated<Board>>('/boards', {query: params})
}