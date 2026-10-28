import { FormDialog } from '../../components/FormDialog'
import { TaskForm, } from "./TaskForm";
import type { Task } from "../../types";

interface taskDialogProps {
    open: boolean, onClose: () => void, boardId: string, task?: Task
}

export function TaskDialog({ open, onClose, boardId, task }: taskDialogProps) {
    return <FormDialog
        title={task ? 'עריכת משימה' : 'משימה חדשה'}
        open={open} onClose={onClose}
        children={<TaskForm boardId={boardId} task={task} onClose={onClose} />}>

    </FormDialog>
}