import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RegisterFormValues, registerSchema } from './authSchemas'
import { Box, Stack, TextField, Button, Alert } from '@mui/material'
import { useRegister } from './authHooks'
import { useNavigate } from 'react-router-dom'
import { PasswordField } from '../../components/PasswordField'
import { getErrorMessage } from '../../utils/errorMessages'


export function RegisterForm() {
    const { mutate, isPending, error } = useRegister()
    const { register, handleSubmit, formState } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: '', email: '', password: '' }
    })
    const navigate = useNavigate()
    function onSubmit(values: RegisterFormValues) {
        mutate(values, { onSuccess: () => { navigate('/', { replace: true }) } })
    }
    return <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
            <TextField {...register('name')} label='שם מלא' autoComplete='name' error={!!formState.errors.name} helperText={formState.errors.name?.message} fullWidth></TextField>
            <TextField {...register('email')} label='אימייל' type='email' autoComplete='email' error={!!formState.errors.email} helperText={formState.errors.email?.message} fullWidth></TextField>
            <PasswordField {...register('password')} label='סיסמה' autoComplete='new-password' error={!!formState.errors.password} helperText={formState.errors.password?.message} fullWidth />
            {error && <Alert severity='error'>{getErrorMessage(error, 'משהו השתבש, נסה שוב')}</Alert>}
            <Button type='submit' variant='contained' size='large' disabled={isPending}>{isPending ? 'יוצרים חשבון...' : 'יצירת חשבון'}</Button>
        </Stack>
    </Box>

}