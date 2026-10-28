import { useState } from 'react';
import type { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material';
import { useTask } from './tasksHooks';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { CircularPending } from '../../components/CircularPending';

interface TaskDetailsDialogProps {
    boardId: string,
    taskId: string,
    canEdit: boolean,
    onClose: () => void
}

export function TaskDetailsDialog({ boardId, taskId, canEdit, onClose }: TaskDetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false)
    const { data: task, error } = useTask(boardId, taskId)
    let content: ReactNode
    if (!task && error)
        content = <Alert severity="error">{error?.message ?? 'לא הצלחנו לטעון את המשימה'}</Alert>;
    else if (!task)
        content = <CircularPending />
    else if (isEditing)
        content = <TaskForm boardId={boardId} task={task} onClose={onClose} />
    else
        content = <TaskItem task={task} canEdit={canEdit} onEdit={() => setIsEditing(true)} onDelete={onClose} />
    return <Dialog open onClose={onClose} fullWidth>
        <DialogTitle>{isEditing ? 'עריכת משימה' : 'פרטי משימה'}</DialogTitle>
        <DialogContent>{content}</DialogContent>
    </Dialog>
}