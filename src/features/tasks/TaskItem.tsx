import { Paper, Stack, Typography, Chip, IconButton } from "@mui/material"
import { EditOutlined, DeleteOutlined } from '@mui/icons-material'
import type { Task } from "../../types"
import { statusLabels, statusColors, priorityLabels } from './taskLabels'
import dayjs from 'dayjs'
import { useDeleteTask } from "./tasksHooks"

interface TaskItemProps {
    task: Task,
    canEdit: boolean,
    onEdit: () => void
}

export function TaskItem({ task, canEdit, onEdit }: TaskItemProps) {
    const deleteTask = useDeleteTask(task.boardId)
    function handleDelete() {
        if (window.confirm(`?${task.title} למחוק את המשימה:`))
            deleteTask.mutate(task.id)
    }
    return <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" sx={{justifyContent: 'space-between',alignItems: 'flex-start',}} spacing={1}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Stack direction="row" spacing={0.5}>
                {canEdit && task.scheduleType !== 'TIMED' && <IconButton size="small" aria-label="✏️" onClick={onEdit}>
                    <EditOutlined fontSize="small" />
                </IconButton>}
                {canEdit && <IconButton size="small" color="error" aria-label="🗑️" onClick={handleDelete} disabled={deleteTask.isPending}>
                    <DeleteOutlined fontSize="small" />
                </IconButton>}
                {deleteTask.isError && <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>המחיקה נכשלה</Typography>}
            </Stack>
        </Stack>
        {task.description && <Typography variant='body2' color="text.secondary">{task.description}</Typography>}
        <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
            <Chip
                size="small"
                label={statusLabels[task.status]}
                color={statusColors[task.status]}
            />

            <Chip
                size="small"
                variant="outlined"
                label={`עדיפות: ${priorityLabels[task.priority]}`}
            />

            {task.dueDate && (
                <Chip
                    size="small"
                    variant="outlined"
                    label={dayjs(task.dueDate).format('DD/MM/YYYY')}
                />
            )}
        </Stack>
    </Paper>
}