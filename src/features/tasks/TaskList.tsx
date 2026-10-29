import { useTasks } from './tasksHooks'
import { Typography, Alert } from '@mui/material'
import { CircularPending } from '../../components/CircularPending'
import { TaskItem } from './TaskItem'
import { useState } from 'react'
import type { Task } from '../../types'
import { TaskDialog } from './TaskDialog'

export interface TaskListProps {
    boardId: string,
    canEdit: boolean
}

export function TaskList({ boardId, canEdit }: TaskListProps) {
    const { data, isPending, isError } = useTasks(boardId)
    const [editingTask, setEditingTask] = useState<Task | null>()
    if (isPending)
        return <CircularPending />
    if (isError)
        return <Alert severity='error'>לא הצלחנו לטעון את המשימות</Alert>
    if (data.items.length === 0)
        return <div className="empty-note">
            <p className="empty-note__title">אין עדיין משימות</p>
            <p className="empty-note__text">{canEdit ? 'אפשר להוסיף משימה ראשונה בכפתור "משימה חדשה".' : 'כשיתווספו משימות ללוח, הן יופיעו כאן.'}</p>
        </div>
    return <>
        <div className="note-grid stagger">
            {data.items.map(task => <TaskItem key={task.id} task={task} canEdit={canEdit} onEdit={() => setEditingTask(task)} />)}
        </div>
        {data.pagination.total > data.items.length && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                מוצגות {data.items.length} מתוך {data.pagination.total} משימות
            </Typography>
        )}
        {editingTask && <TaskDialog open boardId={boardId} task={editingTask} onClose={() => setEditingTask(null)} />}
    </>
}