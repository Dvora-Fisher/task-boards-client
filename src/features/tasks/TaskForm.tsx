import { useCreateTask, useUpdateTask } from "./tasksHooks"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Stack, TextField, Alert, MenuItem, ToggleButtonGroup, Typography, ToggleButton, Autocomplete, FormControlLabel, Switch } from '@mui/material'
import { useMembers } from '../members/membersHooks'
import { emptyTaskValues, taskSchema, toFormValues, toTaskInput, type TaskFormValues } from './taskSchemas'
import { statusLabels, priorityLabels, scheduleLabels } from "./taskLabels"
import type { Task, ScheduleType } from "../../types"
import dayjs from 'dayjs'
import { timeFormat } from '../../utils/timeFormat';
import { getErrorMessage } from "../../utils/errorMessages"
import { FormActions } from '../../components/FormActions'
import { SchedulingSuggestions } from '../scheduling/SchedulingSuggestions'
import { hebrewHint } from '../../utils/hebrewDate';

interface TaskFormProrps {
    boardId: string,
    onClose: () => void,
    task?: Task
}

export function TaskForm({ boardId, onClose, task }: TaskFormProrps) {
    const createTask = useCreateTask(boardId)
    const updateTask = useUpdateTask(boardId)
    const isPending = createTask.isPending || updateTask.isPending
    const isError = createTask.isError || updateTask.isError
    const { register, control, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: task ? toFormValues(task) : emptyTaskValues
    });
    const { data: members = [], isPending: membersPending } = useMembers(boardId)
    const scheduleType = watch('scheduleType')
    const audience = watch('audience')
    const assigneeIds = watch('assigneeIds')
    const [dueDate, startAt, endAt] = watch(['dueDate', 'startAt', 'endAt'])
    function onSubmit(values: TaskFormValues) {
        const input = toTaskInput(values)
        if (task)
            updateTask.mutate({ taskId: task.id, input }, { onSuccess: onClose })
        else
            createTask.mutate(input, { onSuccess: onClose })
    }
    const error = createTask.error ?? updateTask.error

    return <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pt: 1 }}>
            {isError && <Alert severity="error">{getErrorMessage(error, 'לא הצלחנו לשמור את המשימה, נסה שוב')}</Alert>}
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>תזמון</Typography>
            <Controller
                name="scheduleType"
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        exclusive
                        fullWidth
                        size="small"
                        color="primary"
                        value={field.value}
                        onChange={(_, value: ScheduleType | null) => {
                            if (value) field.onChange(value);
                        }}
                    >
                        {(Object.keys(scheduleLabels) as ScheduleType[]).map((type) => (
                            <ToggleButton key={type} value={type}>
                                {scheduleLabels[type]}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            />
            {scheduleType === 'DATE' &&
                <TextField type="date" label='תאריך' {...register('dueDate')} error={!!errors.dueDate} helperText={errors.dueDate?.message ?? hebrewHint(dueDate)} slotProps={{ inputLabel: { shrink: true } }} />
            }
            {
                scheduleType === 'TIMED' &&
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField type="datetime-local" label="שעת התחלה" fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={!!errors.startAt}
                        helperText={errors.startAt?.message ?? hebrewHint(startAt)}
                        {...register('startAt', {
                            onChange: (e) => {
                                const start: string = e.target.value;
                                if (!start) return;
                                const end = getValues('endAt')
                                if (!end || !dayjs(end).isAfter(dayjs(start)))
                                    setValue('endAt', dayjs(start).add(1, 'hour').format(timeFormat), { shouldValidate: true })
                            }
                        }
                        )} />
                    <TextField type="datetime-local" label="שעת סיום" fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={!!errors.endAt}
                        helperText={errors.endAt?.message ?? hebrewHint(endAt)}
                        {...register('endAt')} />
                </Box>
            }
            {scheduleType === 'TIMED' &&
                <SchedulingSuggestions
                    boardId={boardId}
                    assignedUserId={assigneeIds[0]}
                    onSelect={(slot) => {
                        setValue('startAt', dayjs(slot.startAt).format(timeFormat), { shouldValidate: true })
                        setValue('endAt', dayjs(slot.endAt).format(timeFormat), { shouldValidate: true })
                    }}
                />
            }
            {members.length > 1 && (
                <>
                    <Controller
                        name="assigneeIds"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                options={members.map((m) => m.user)}
                                getOptionValue={(user) => user.id}
                                getOptionLabel={(user) => user.name}
                                value={field.value}
                                onChange={(_, ids) => field.onChange(ids)}
                                loading={membersPending}
                                noOptionsText="אין חברות נוספות"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="משויכות"
                                        placeholder="בחירה"
                                        error={!!errors.assigneeIds}
                                        helperText={errors.assigneeIds?.message}
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        name="audience"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                label="גלויה רק למשויכות"
                                control={
                                    <Switch
                                        checked={field.value === 'SELECTED'}
                                        onChange={(_, checked) => field.onChange(checked ? 'SELECTED' : 'BOARD')}
                                    />
                                }
                            />
                        )}
                    />
                    {audience === 'SELECTED' && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: -1.5 }}>
                            רק היוצרת והמשויכות יראו את המשימה. גם בעלת הלוח לא תראה אותה.
                        </Typography>
                    )}
                </>
            )}
            <FormActions onCancel={onClose} isPending={isPending} />
        </Stack>
    </Box>
}