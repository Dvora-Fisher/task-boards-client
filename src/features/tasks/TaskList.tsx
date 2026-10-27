import {useTasks} from './tasksHooks'
import { Typography, Alert, CircularProgress, Stack } from '@mui/material'
import { TaskItem } from './TaskItem'

export interface TaskListProps {
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
    return <Stack spacing={1.5}>
        {data.items.map(task => <TaskItem key={task.id} task={task}/>)}
    </Stack>
}