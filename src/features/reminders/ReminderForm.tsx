import type { Reminder } from "../../types";
import { useCreateReminder, useUpdateReminder } from "./reminderHooks";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Stack, TextField, Alert } from '@mui/material'
import {FormActions} from '../../components/FormActions'
import { getErrorMessage } from "../../utils/errorMessages"
import { reminderSchema, emptyReminderValues, toFormValues, toReminderInput, type ReminderFormValues } from './reminderSchemas'

interface ReminderFormProps {
    boardId: string,
    onClose: () => void,
    reminder?: Reminder
}

export function ReminderForm({ boardId, onClose, reminder }: ReminderFormProps) {
    const createReminder = useCreateReminder(boardId)
    const updateReminder = useUpdateReminder(boardId)
    const isPending = createReminder.isPending || updateReminder.isPending
    const isError = createReminder.isError || updateReminder.isError
    const { register, handleSubmit, formState: { errors } } = useForm<ReminderFormValues>({
        resolver: zodResolver(reminderSchema),
        defaultValues: reminder ? toFormValues(reminder) : emptyReminderValues
    });
    function onSubmit(values: ReminderFormValues) {
        const input = toReminderInput(values)
        if (reminder)
            updateReminder.mutate({ reminderId: reminder.id, input }, { onSuccess: onClose })
        else
            createReminder.mutate(input, { onSuccess: onClose })
    }
    const error = createReminder.error ?? updateReminder.error

    return <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pt: 1 }}>
            {isError && <Alert severity="error">{getErrorMessage(error, 'לא הצלחנו לשמור את התזכורת, נסה שוב')}</Alert>}
            <TextField {...register('title')} label='הודעת התזכורת' error={!!errors.title} helperText={errors.title?.message} autoFocus></TextField>
            <TextField {...register('description')} label='תיאור' multiline minRows={3}></TextField>
            <TextField type="datetime-local" label="מועד התזכורת" fullWidth
                {...register('remindAt')}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.remindAt}
                helperText={errors.remindAt?.message} />
            <FormActions onCancel={onClose} isPending={isPending} />
        </Stack>
    </Box>

}