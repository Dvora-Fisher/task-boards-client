import { Stack, Typography, Chip, IconButton, Tooltip } from "@mui/material"
import { EditOutlined, DeleteOutlined, AccessTimeOutlined, EventOutlined, CheckCircle } from '@mui/icons-material'
import type { Task } from "../../types"
import { statusLabels, priorityLabels } from './taskLabels'
import dayjs from 'dayjs'
import { useState } from "react"
import { useDeleteTask } from "./tasksHooks"
import { formatTimeRange } from '../../utils/timeFormat'
import { ConfirmDialog } from "../../components/ConfirmDialog"

interface TaskItemProps {
    task: Task,
    canEdit: boolean,
    onEdit: () => void,
    onDelete?: () => void
}

/* צבע הפתק לפי הסטטוס */
const statusTone: Record<Task['status'], string> = {
    TODO: 'yellow',
    IN_PROGRESS: 'blue',
    DONE: 'mint',
}

export function TaskItem({ task, canEdit, onEdit, onDelete }: TaskItemProps) {
    const deleteTask = useDeleteTask(task.boardId)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    function handleDelete() {
        deleteTask.mutate(task.id, { onSuccess: () => { setIsConfirmOpen(false); onDelete?.() } })
    }
    return <article className={`task-note note note--${statusTone[task.status]}`} data-status={task.status}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', }} spacing={1}>
            <Typography variant="subtitle1" component="h3" className="task-note__title">
                {task.status === 'DONE' && <CheckCircle className="task-note__check" fontSize="small" />}
                {task.title}
            </Typography>
            <Stack direction="row" spacing={0.5} className="note-actions">
                {canEdit && <Tooltip title="עריכה"><IconButton size="small" aria-label="עריכת המשימה" onClick={onEdit}>
                    <EditOutlined fontSize="small" />
                </IconButton></Tooltip>}
                {canEdit && <Tooltip title="מחיקה"><IconButton size="small" className="note-actions__delete" aria-label="מחיקת המשימה" onClick={() => setIsConfirmOpen(true)} disabled={deleteTask.isPending}>
                    <DeleteOutlined fontSize="small" />
                </IconButton></Tooltip>}
            </Stack>
        </Stack>
        {task.description && <Typography variant='body2' className="task-note__desc">{task.description}</Typography>}
        <Stack direction='row' spacing={0.75} useFlexGap sx={{ mt: 1.5, flexWrap: 'wrap' }}>
            <Chip
                size="small"
                className={`tag status-tag status-tag--${task.status}`}
                label={statusLabels[task.status]}
            />

            <Chip
                size="small"
                className={`tag priority-tag priority-tag--${task.priority}`}
                label={`עדיפות ${priorityLabels[task.priority]}`}
            />

            {task.dueDate && (
                <Chip
                    size="small"
                    className="tag tag--plain"
                    icon={<EventOutlined />}
                    label={dayjs(task.dueDate).format('DD/MM/YYYY')}
                />
            )}
            {task.startAt && task.endAt && (
                <Chip
                    size="small"
                    className="tag tag--time"
                    icon={<AccessTimeOutlined />}
                    label={formatTimeRange(task.startAt, task.endAt)}
                />
            )}
        </Stack>
        {deleteTask.isError && <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>המחיקה נכשלה</Typography>}
        <ConfirmDialog
            open={isConfirmOpen}
            title="למחוק את המשימה?"
            isPending={deleteTask.isPending}
            onConfirm={handleDelete}
            onCancel={() => setIsConfirmOpen(false)}
        >
            המשימה <strong>{task.title}</strong> תימחק מהלוח.
        </ConfirmDialog>
    </article>
}
