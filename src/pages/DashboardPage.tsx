import { Link as RouterLink} from "react-router-dom"
import { useBoards } from "../features/boards/boardsHooks"
import { Typography, Box, CircularProgress, Alert, Link } from "@mui/material"

export function DashboardPage() {
    const { data, isPending, isError } = useBoards()
    if (isPending)
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    if(isError)
        return <Alert severity="error">לא הצלחנו לטעון את הלוחות</Alert>
    if(data.items.length === 0)
        return <Typography>עדיין אין לך לוחות</Typography>

    return <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        <Typography variant="h4" component='h1' sx={{mb: 3}}>הלוחות שלי</Typography>
        {data.items.map(board => <Link key={board.id} component={RouterLink} to={`/boards/${board.id}`}>{board.name}</Link>)}
    </Box>
}