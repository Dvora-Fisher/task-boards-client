import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormValues, loginSchema, type RegisterFormValues, registerSchema } from './authSchemas'
import { Box, Stack, TextField, Button, Alert } from '@mui/material'
import { useLogin, useRegister } from './authHooks'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/client'


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
            <TextField {...register('name')} label='שם מלא' type='name' autoComplete='name' error={!!formState.errors.name} helperText={formState.errors.name?.message} fullWidth></TextField>
            <TextField {...register('email')} label='אימייל' type='email' autoComplete='email' error={!!formState.errors.email} helperText={formState.errors.email?.message} fullWidth></TextField>
            <TextField {...register('password')} label='סיסמה' type='password' autoComplete='new-password' error={!!formState.errors.password} helperText={formState.errors.password?.message} fullWidth></TextField>
            {error && <Alert severity='error'>{errorMassage(error)}</Alert>}
            <Button type='submit' variant='contained' disabled={isPending}>הרשמה</Button>
        </Stack>
    </Box>

}


function errorMassage(error: Error) {
    if (error instanceof ApiError && error.code === 'EMAIL_TAKEN')
        return 'האימייל כבר רשום'
    return 'משהו השתבש, נסה שוב'
}