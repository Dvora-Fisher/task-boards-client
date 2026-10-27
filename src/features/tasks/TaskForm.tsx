import { useCreateTask } from "./tasksHooks"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Stack, TextField, Button, Alert, MenuItem } from '@mui/material'
import { taskSchema, toTaskInput, type TaskFormValues } from './taskSchemas'
import { statusLabels, priorityLabels } from "./taskLabels"

interface TaskFromProrps {
    boardId: string,
    onClose: () => void
}

export function TaskForm({ boardId, onClose }: TaskFromProrps) {
    const { mutate, isPending, isError } = useCreateTask(boardId)
    const { register, control, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'TODO',
            priority: 'MEDIUM',
            scheduleType: 'NONE',
            dueDate: ''
        }
    });
    function onSubmit(values: TaskFormValues) {
        mutate(toTaskInput(values), { onSuccess: onClose })
    }

    return <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pt: 1 }}></Stack>
        {isError && <Alert severity="error">לא הצלחנו לשמור את המשימה, נסה שוב</Alert>}
        <TextField {...register('title')} label='כותרת המשימה' error={!!errors.title} helperText={errors.title?.message} autoFocus></TextField>
        <TextField {...register('description')} label='תיאור' multiline minRows={3}></TextField>
        <Controller name="status" control={control} render={(field) => <TextField select label='סטטוס' {...field}>
            {Object.entries(statusLabels).map(([key, value]) => <MenuItem key={key} value={value}>{value}</MenuItem>)}
        </TextField>} />
        <Controller name="priority" control={control} render={(field) => <TextField select label='עדיפות' {...field}>
            {Object.entries(priorityLabels).map(([key, value]) => <MenuItem key={key} value={value}>{value}</MenuItem>)}
        </TextField>} />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>ביטול</Button>
            <Button type="submit" variant="contained" disabled={isPending}>{isPending ? 'שומר...' : 'שמירה'}</Button>
        </Box>
    </Box>

}