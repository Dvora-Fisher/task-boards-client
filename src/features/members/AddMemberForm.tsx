import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Stack, TextField, Button, Alert } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useAddMember } from './membersHooks';
import { getErrorMessage } from '../../utils/errorMessages';
export const memberSchema = z.object({
    email: z.email('אימייל לא תקין')
})

export type memberFormValues = z.infer<typeof memberSchema>

interface addMemberProps{
    boardId: string
}
export function AddMemberForm({boardId}: addMemberProps) {
    const addMember = useAddMember(boardId)
    const { register, handleSubmit, reset, formState: {errors} } = useForm<memberFormValues>({
        resolver: zodResolver(memberSchema),
        defaultValues: { email: '' }
    });
    const onSubmit = (values: { email: string }) => addMember.mutate(values.email, { onSuccess: () => reset() })

    return <Stack spacing={1} sx={{ mb: 2 }}>
        { addMember.isError && <Alert severity='error'> {getErrorMessage(addMember.error, 'לא הצלחנו להוסיף, נסה שוב')}</Alert>}
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
            <TextField {...register('email')} label="אימייל של חבר להוספה" error={!!errors.email} helperText={errors.email?.message} size="small" fullWidth />
            <Button type="submit" variant="contained" startIcon={<PersonAddOutlinedIcon />} disabled={addMember.isPending} sx={{ flexShrink: 0 }}>הוספה</Button>
        </Stack>

    </Stack>
}