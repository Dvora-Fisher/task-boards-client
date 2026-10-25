import {Link} from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useLogout } from '../features/auth/authHooks'
import {Button} from '@mui/material'
export function Navbar() {
    const {mutate, isPending} = useLogout()
    return <div>
        <Link to="/">Save The Date</Link>
        <img src={logo} alt="logo" style={{height:'100px'}}/>
        <Button disabled={isPending} onClick={() => {mutate()}} variant="outlined">התנתקות</Button>
    </div>
}