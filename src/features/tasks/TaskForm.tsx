import { useCreateTask, useUpdateTask } from "./tasksHooks"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Stack, TextField, Button, Alert, MenuItem } from '@mui/material'
import { emptyTaskValues, taskSchema, toFormValues, toTaskInput, type TaskFormValues } from './taskSchemas'
import { statusLabels, priorityLabels } from "./taskLabels"
import type { Task } from "../../types"

interface TaskFormProrps {
    boardId: string,
    onClose: () => void,
    task?: Task
}

export function TaskForm({ boardId, onClose, task }: TaskFormProrps) {
    const createTask = useCreateTask(boardId)
    const updateTask = useUpdateTask(boardId)
    const isPending = createTask.isPending || updateTask.isPending
    const isError  = createTask.isError || updateTask.isError
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: task ? toFormValues(task) : emptyTaskValues       
    });
    const scheduleType = watch('scheduleType')
    function onSubmit(values: TaskFormValues) {
        const input = toTaskInput(values)
        if(task)
            updateTask.mutate({taskId:task.id, input}, {onSuccess: onClose})
        else
            createTask.mutate(input, { onSuccess: onClose })
    }

    return <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pt: 1 }}>
            {isError && <Alert severity="error">לא הצלחנו לשמור את המשימה, נסה שוב</Alert>}
            <TextField {...register('title')} label='כותרת המשימה' error={!!errors.title} helperText={errors.title?.message} autoFocus></TextField>
            <TextField {...register('description')} label='תיאור' multiline minRows={3}></TextField>
            <Controller name="status" control={control} render={
                ({ field }) =>
                    <TextField select label='סטטוס' {...field}>
                        {Object.entries(statusLabels).map(([code, label]) => <MenuItem key={code} value={code}>{label}</MenuItem>)}
                    </TextField>}>
            </Controller>
            <Controller name="priority" control={control} render={
                ({ field }) =>
                    <TextField select label='עדיפות' {...field}>
                        {Object.entries(priorityLabels).map(([code, label]) => <MenuItem key={code} value={code}>{label}</MenuItem>)}
                    </TextField>} >
            </Controller>
            <Controller name="scheduleType" control={control} render={
                ({ field }) =>
                    <TextField select label='תזמון' {...field}>
                        <MenuItem value='NONE'>בלי תאריך</MenuItem>
                        <MenuItem value='DATE'>תאריך</MenuItem>
                    </TextField>
            }>
            </Controller>
            {scheduleType === 'DATE' &&
                <TextField type="date" label='תאריך' {...register('dueDate')} error={!!errors.dueDate} helperText={errors.dueDate?.message} slotProps={{ inputLabel: { shrink: true } }} />
            }
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={onClose}>ביטול</Button>
                <Button type="submit" variant="contained" disabled={isPending}>{isPending ? 'שומר...' : 'שמירה'}</Button>
            </Box>
        </Stack>
    </Box>

}