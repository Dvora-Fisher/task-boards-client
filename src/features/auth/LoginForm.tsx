import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormValues, loginSchema } from './authSchemas'
import { Box, Stack, TextField, Button, Alert } from '@mui/material'
import { useLogin } from './authHooks'
import { useNavigate } from 'react-router-dom'
import { PasswordField } from '../../components/PasswordField'
import { getErrorMessage } from '../../utils/errorMessages'


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
           <PasswordField {...register('password')} label='סיסמה' autoComplete='current-password' error={!!formState.errors.password} helperText={formState.errors.password?.message} fullWidth />
            {error && <Alert severity='error'>{getErrorMessage(error, 'משהו השתבש, נסה שוב')}</Alert>}
            <Button type='submit' variant='contained' size='large' disabled={isPending}>{isPending ? 'מתחברים...' : 'התחברות'}</Button>
        </Stack>
    </Box>

}