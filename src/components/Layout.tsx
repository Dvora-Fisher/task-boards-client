import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";

export function Layout() {
    return <>
        <Navbar />
        <Container maxWidth='lg' component='main' className='app-main'>
            <Outlet />
        </Container>
    </>
}
