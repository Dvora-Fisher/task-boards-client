import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { Container, Paper, Tabs, Typography, Tab, Box } from "@mui/material";

export function AuthPage() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const tab = pathname === '/login' ? '/login' : '/register'

    return <Container maxWidth='xs' sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
            <Typography
                variant="h5" component='h1'
                align='center' sx={{ mb: 2 }}>
                Save The Date
            </Typography>
            <Tabs
                value={tab} onChange={(_, value: string) => navigate(value)}
                variant="fullWidth"
            >
                <Tab label='התחברות' value='/login' />
                <Tab label='הרשמה' value='/register' />
            </Tabs>
            <Box sx={{ mt: 3 }}>
                {tab === '/login' ? <LoginForm /> : <RegisterForm />}
            </Box>
        </Paper>
    </Container>

}