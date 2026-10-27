import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TaskForm, } from "./TaskForm";
import type { Task } from "../../types";

interface taskDialogProps{
    open: boolean, onClose: ()=>void, boardId: string, task?: Task
}

export function TaskDialog({open, onClose, boardId, task}: taskDialogProps){
    return <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>{task? 'עריכת משימה' : 'משימה חדשה'}</DialogTitle>
        <DialogContent>
             <TaskForm boardId={boardId} task={task} onClose={onClose}/>
        </DialogContent>
    </Dialog>
}