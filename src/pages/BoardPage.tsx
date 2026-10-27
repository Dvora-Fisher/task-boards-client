import { useParams } from "react-router-dom"
import { useBoard } from "../features/boards/boardsHooks"
import { Typography, Box, Alert, Link, Tabs, Tab, Button} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { TaskList } from "../features/tasks/TaskList"
import { useState } from "react"
import { TaskDialog } from "../features/tasks/TaskDialog"
import {BoardCalendar} from '../features/calendar/BoardCalendar'
import { CircularPending } from "../components/CircularPending"


export function BoardPage() {
    const { boardId } = useParams<{ boardId: string }>()
    const [view, setView] = useState<'list' | 'calendar'>('calendar')
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const { data: board, isPending, isError } = useBoard(boardId!)
    if (isPending)
        return <CircularPending/>
    if (isError)
        return <Alert severity="error">הלוח לא נמצא או שאין לך גישה אליו</Alert>
    return <Box>
        <Link component={RouterLink} to='/'>לכל הלוחות</Link>
        <Typography variant="h4" component={'h1'}>{board.name}</Typography>
        {board.description && <Typography color="text.secondary">{board.description}</Typography>}
        {board.myAccess.canEdit && <Button variant="contained" onClick={() => setIsCreateOpen(true)}>משימה חדשה</Button>}
        <Tabs value={view} onChange={(_, newView) => setView(newView)}>
            <Tab label='לוח זמנים' value='calendar'></Tab>
            <Tab label='רשימת משימות' value='list'></Tab>
        </Tabs>
        <Box sx={{ mt: 3 }}>
            { view === 'list'? <TaskList boardId={board.id} canEdit={board.myAccess.canEdit} /> : <BoardCalendar boardId={board.id}  canEdit={board.myAccess.canEdit}/>}
        </Box>
        <TaskDialog open={isCreateOpen} boardId={board.id} onClose={()=>setIsCreateOpen(false)}/>
    </Box>

}