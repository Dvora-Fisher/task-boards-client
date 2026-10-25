import {z} from 'zod';

export const loginSchema = z.object({
    email: z.email('כתובת אימייל לא תקינה'),
    password: z.string().min(1, 'יש להזין סיסמה')
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string('יש להזין שם').trim().min(1, 'יש להזין שם').max(100, 'עד 100 תווים')
    , email: z.email('כתובת אימייל לא תקינה')
    , password: z.string().min(8, 'לפחות 8 תווים').regex(/[A-Za-z]/, 'חובה לכלול אות אנגלית').regex(/\d/, 'חובה לכלול ספרה')
})

export type RegisterFormValues = z.infer<typeof registerSchema>