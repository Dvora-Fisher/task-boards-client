import {useTasks} from './tasksHooks'
import { Box, Typography, Alert, CircularProgress } from '@mui/material'

interface TaskListProps {
    boardId: string
} 

export function TaskList({boardId}: TaskListProps){
    const {data, isPending, isError} = useTasks(boardId)
    if(isPending)
        return <CircularProgress size={24}/>
    if(isError)
        return <Alert severity='error'>לא הצלחנו לטעון את המשימות</Alert>
    if(data.items.length === 0)
        return <Typography>אין עדיין משימות בלוח</Typography>
    return <Box>
        {data.items.map(task => <Typography key={task.id}>{task.title}</Typography>)}
    </Box>
}