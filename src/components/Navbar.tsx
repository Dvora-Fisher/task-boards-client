import {Link} from 'react-router-dom'
import logo from '../assets/logo.jpg'
export function Navbar() {
    return <div>
        <Link to="/">Save The Date</Link>
        <img src={logo} alt="logo" style={{height:'100px'}}/>
    </div>
}