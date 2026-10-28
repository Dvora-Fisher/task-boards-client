import { ReminderForm } from "./ReminderForm";
import type { Reminder } from "../../types";
import { FormDialog } from '../../components/FormDialog'

interface ReminderDialogProps {
    open: boolean, onClose: () => void, boardId: string, reminder?: Reminder
}

export function ReminderDialog({ open, onClose, boardId, reminder }: ReminderDialogProps) {
    return <FormDialog
        title={reminder ? 'עריכת תזכורת' : 'תזכורת חדשה'}
        open={open} onClose={onClose}>
        <ReminderForm boardId={boardId} reminder={reminder} onClose={onClose} />
    </FormDialog>
}