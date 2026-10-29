import { Stack, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { EditOutlined, DeleteOutlined, NotificationsOutlined } from '@mui/icons-material';
import { useState } from 'react';
import type { Reminder } from '../../types';
import { useDeleteReminder } from './reminderHooks';
import { formatDateTime } from '../../utils/timeFormat';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface ReminderItemProps {
    reminder: Reminder,
    canEdit: boolean,
    onEdit: () => void,
    onDelete?: () => void
}

export function ReminderItem({ reminder, canEdit, onEdit, onDelete }: ReminderItemProps) {
    const deleteReminder = useDeleteReminder(reminder.boardId)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    function handleDelete() {
        deleteReminder.mutate(reminder.id, { onSuccess: () => { setIsConfirmOpen(false); onDelete?.() } })
    }

    return <article className="reminder-note note note--cream">
        <span className="reminder-note__tape" aria-hidden="true" />
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="subtitle1" component="h3" className="reminder-note__title">
                <NotificationsOutlined className="reminder-note__bell" fontSize="small" />
                {reminder.title}
            </Typography>
            {canEdit && (
                <Stack direction="row" spacing={0.5} className="note-actions">
                    <Tooltip title="עריכה"><IconButton size="small" aria-label="עריכת התזכורת" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton></Tooltip>
                    <Tooltip title="מחיקה"><IconButton size="small" className="note-actions__delete" aria-label="מחיקת התזכורת" onClick={() => setIsConfirmOpen(true)} disabled={deleteReminder.isPending}>
                        <DeleteOutlined fontSize="small" />
                    </IconButton></Tooltip>
                </Stack>
            )}
        </Stack>

        {reminder.description && (
            <Typography variant="body2" className="reminder-note__desc">{reminder.description}</Typography>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Chip
                size="small"
                className="tag tag--reminder"
                icon={<NotificationsOutlined />}
                label={formatDateTime(reminder.remindAt)}
            />
        </Stack>

        {deleteReminder.isError && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>המחיקה נכשלה</Typography>
        )}
        <ConfirmDialog
            open={isConfirmOpen}
            title="למחוק את התזכורת?"
            isPending={deleteReminder.isPending}
            onConfirm={handleDelete}
            onCancel={() => setIsConfirmOpen(false)}
        >
            התזכורת <strong>{reminder.title}</strong> תימחק מהלוח.
        </ConfirmDialog>
    </article>
}
