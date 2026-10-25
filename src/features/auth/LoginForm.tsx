import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormValues, loginSchema } from './authSchemas'
import { Box, Stack, TextField, Button, Alert } from '@mui/material'
import { useLogin } from './authHooks'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/client'


export function LoginForm() {
    const { mutate, isPending, error } = useLogin()
    const { register, handleSubmit, formState } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    })
    const navigate = useNavigate()
    function onSubmit(values: LoginFormValues) {
        mutate(values, { onSuccess: () => { navigate('/', { replace: true }) } })
    }
    return <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
            <TextField {...register('email')} label='אימייל' type='email' autoComplete='email' error={!!formState.errors.email} helperText={formState.errors.email?.message} fullWidth></TextField>
            <TextField {...register('password')} label='סיסמה' type='password' autoComplete='current-password' error={!!formState.errors.password} helperText={formState.errors.password?.message} fullWidth></TextField>
            {error && <Alert severity='error'>{errorMessage(error)}</Alert>}
            <Button type='submit' variant='contained' disabled={isPending}>התחברות</Button>
        </Stack>
    </Box>

}


function errorMessage(error: Error) {
    if (error instanceof ApiError && error.code === 'INVALID_CREDENTIALS')
        return 'אימייל או סיסמה שגויים'
    return 'משהו השתבש, נסה שוב'
}