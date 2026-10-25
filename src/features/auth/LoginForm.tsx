import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormValues, loginSchema } from './authSchemas'
import { Box, Stack, TextField, Button } from '@mui/material'

export function LoginForm() {
    const { register, handleSubmit, formState } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    })
    function onSubmit(values: LoginFormValues) {
        console.log(values)
    }
    return <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
                <TextField {...register('email')} label='אימייל' type='email' autoComplete='email' error={!!formState.errors.email} helperText={formState.errors.email?.message} fullWidth></TextField>
                <TextField {...register('password')} label='סיסמה' type='password' autoComplete='current-password' error={!!formState.errors.password} helperText={formState.errors.password?.message} fullWidth></TextField>
                <Button type='submit' variant='contained'>התחברות</Button>
            </Stack>
        </Box>

}