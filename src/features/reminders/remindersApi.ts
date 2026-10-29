import {api, MAX_PAGE_SIZE} from '../../api/client'
import type { Reminder, Paginated, CreateReminderInput, UpdateReminderInput } from '../../types'

export function getReminders(boardId: string){
    return api<Paginated<Reminder>>(`/boards/${boardId}/reminders`,{
         query: { pageSize: MAX_PAGE_SIZE },
    })
}

export function getReminder(reminderId: string){
    return api<Reminder>(`/reminders/${reminderId}`)
}

export function createReminder(boardId: string, input: CreateReminderInput){
    return api<Reminder>(`/boards/${boardId}/reminders`, {
        method: 'POST',
        body: input,
    })
}

export function updateReminder(reminderId: string, input: UpdateReminderInput){
    return api<Reminder>(`/reminders/${reminderId}`, {
        method: 'PATCH',
        body: input,
    })
}

export function deleteReminder(reminderId: string){
    return api<void>(`/reminders/${reminderId}`, {
        method: 'DELETE',
    })
}