import {api} from '../../api/client'
import type { Member } from '../../types'

export function getMembers(boardId: string){
    return api<Member[]>(`/boards/${boardId}/members`)
}

export function addMember(boardId: string, email: string ){
    return api<Member>(`/boards/${boardId}/members`,{method: 'POST', body: {email}})
}

export function removeMember(boardId: string, userId: string){
    return api<void>(`/boards/${boardId}/members/${userId}`, {
        method: 'DELETE',
    })
}