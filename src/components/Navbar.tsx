import { Link as RouterLink } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useLogout } from '../features/auth/authHooks'
import { Button, AppBar, Toolbar, Box } from '@mui/material'
export function Navbar() {
    const { mutate, isPending } = useLogout()
    return <AppBar position='sticky'>
        <Toolbar>
            <Box component='img' src={logo} alt='Save The Date' sx={{ height: 70 }} />
            <Box component={RouterLink} to='/' sx={{display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none'}}>הלוחות שלי</Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button disabled={isPending} onClick={() => mutate()} variant="outlined" color='inherit'>התנתקות</Button>
        </Toolbar>
    </AppBar>
}

