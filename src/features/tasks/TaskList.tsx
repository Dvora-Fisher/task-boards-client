import { useTasks } from './tasksHooks'
import { Typography, Alert, CircularProgress, Stack } from '@mui/material'
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
        return <CircularProgress size={24} />
    if (isError)
        return <Alert severity='error'>לא הצלחנו לטעון את המשימות</Alert>
    if (data.items.length === 0)
        return <Typography>אין עדיין משימות בלוח</Typography>
    return <>
        <Stack spacing={1.5}>
            {data.items.map(task => <TaskItem key={task.id} task={task} canEdit={canEdit} onEdit={() => setEditingTask(task)} />)}
        </Stack>
        {data.pagination.total > data.items.length && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                מוצגות {data.items.length} מתוך {data.pagination.total} משימות
            </Typography>
        )}
        {editingTask && <TaskDialog open boardId={boardId} task={editingTask} onClose={() => setEditingTask(null)} />}
    </>
}