import { useState } from 'react';
import type { ReactNode } from 'react';
import { Alert } from '@mui/material';
import { useReminder } from './reminderHooks';
import { ReminderItem } from './ReminderItem';
import { ReminderForm } from './ReminderForm';
import { FormDialog } from '../../components/FormDialog';
import { CircularPending } from '../../components/CircularPending';

interface ReminderDetailsDialogProps {
    boardId: string,
    reminderId: string,
    canEdit: boolean,
    onClose: () => void
}

export function ReminderDetailsDialog({ boardId, reminderId, canEdit, onClose }: ReminderDetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false)
    const { data: reminder, isError } = useReminder(boardId, reminderId)

    let content: ReactNode
    if (!reminder && isError)
        content = <Alert severity="error">לא הצלחנו לטעון את התזכורת</Alert>
    else if (!reminder)
        content = <CircularPending />
    else if (isEditing)
        content = <ReminderForm boardId={boardId} reminder={reminder} onClose={onClose} />
    else
        content = <ReminderItem reminder={reminder} canEdit={canEdit} onEdit={() => setIsEditing(true)} onDelete={onClose} />

    return <FormDialog open onClose={onClose} title={isEditing ? 'עריכת תזכורת' : 'פרטי תזכורת'}>
        {content}
    </FormDialog>
}