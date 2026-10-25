import {z} from 'zod';

export const loginSchema = z.object({
    email : z.email('כתובת אימייל לא תקינה'),
    password : z.string().min(1, 'יש להזין סיסמה')
})

export type LoginFormValues = z.infer<typeof loginSchema>