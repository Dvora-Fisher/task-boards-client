import { useParams } from "react-router-dom"
import { useBoard } from "../features/boards/boardsHooks"
import { Typography, Box, CircularProgress, Alert, Link } from "@mui/material"
import { Link as RouterLink} from "react-router-dom"

export function BoardPage() {
    const { boardId } = useParams<{ boardId: string }>()
    const { data: board, isPending, isError } = useBoard(boardId!)
    if (isPending)
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    if(isError)
        return <Alert>הלוח לא נמצא או שאין לך גישה אליו</Alert>
    return <Box>
        <Link component={RouterLink} to='/'>לכל הלוחות</Link>
        <Typography variant="h4" component={'h1'}>{board.name}</Typography>
        {board.description && <Typography color="text.secondary"/>}
        <div>משימות יופיעו כאן</div>
    </Box>
}