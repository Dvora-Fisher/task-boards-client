import { Paper, Stack, Typography, Chip } from "@mui/material"
import type { Task } from "../../types"
import { statusLabels, statusColors, priorityLabels } from './taskLabels'
import dayjs from 'dayjs'

interface TaskItemProps {
    task: Task
}

export function TaskItem({ task }: TaskItemProps) {
    return <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1">{task.title}</Typography>
        { task.description && <Typography variant='body2' color="text.secondary">{task.description}</Typography>}
        <Stack direction='row' spacing={1} sx={{mt: 1}}>
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