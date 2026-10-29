import { Link as RouterLink, NavLink } from 'react-router-dom'
import { useLogout, useMe } from '../features/auth/authHooks'
import { useAppSelector } from '../app/hooks'
import { Button, AppBar, Toolbar, Box } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { UserAvatar } from './UserAvatar'
import { Logo } from './Logo'

export function Navbar() {
    const { mutate, isPending } = useLogout()
    const storedUser = useAppSelector((state) => state.auth.user)
    // אחרי רענון הדף המשתמשת לא שמורה ב-Redux, ולכן נטען אותה מהשרת (‎/auth/me) כדי שהשם יוצג תמיד
    const { data: me } = useMe()
    const user = storedUser ?? me?.user ?? null
    return <AppBar position='sticky' elevation={0} className='app-bar'>
        <Toolbar>
            <Box component={RouterLink} to='/' className='app-bar__brand' aria-label='Save The Date – לדף הבית'>
                <Logo tone='dark' />
            </Box>
            <NavLink to='/' end className='app-bar__link app-bar__link--boards' aria-label='הלוחות שלי'>
                <DashboardOutlinedIcon fontSize='small' />
                <span className='app-bar__link-text'>הלוחות שלי</span>
            </NavLink>
            <NavLink to='/about' className='app-bar__link' aria-label='מאחורי הלוח – הסבר על האתר'>
                <AutoStoriesOutlinedIcon fontSize='small' />
                <span className='app-bar__link-text'>מאחורי הלוח</span>
            </NavLink>
            <Box sx={{ flexGrow: 1 }} />
            {user && <span className='app-bar__user'>
                <UserAvatar user={user} size={34} />
                <span className='app-bar__user-name'>{user.name}</span>
                <span className='app-bar__user-first'>{user.name.trim().split(/\s+/)[0]}</span>
            </span>}
            <Button disabled={isPending} onClick={() => mutate()} variant="outlined" color='inherit' startIcon={<LogoutOutlinedIcon />} aria-label='התנתקות'><span className='app-bar__logout-text'>התנתקות</span></Button>
        </Toolbar>
    </AppBar>
}
