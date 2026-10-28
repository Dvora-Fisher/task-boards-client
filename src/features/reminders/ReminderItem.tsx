import { Paper, Stack, Typography, Chip, IconButton } from '@mui/material';
import { EditOutlined, DeleteOutlined, NotificationsOutlined } from '@mui/icons-material';
import type { Reminder } from '../../types';
import { useDeleteReminder } from './reminderHooks';
import { formatDateTime } from '../../utils/timeFormat';

interface ReminderItemProps {
    reminder: Reminder,
    canEdit: boolean,
    onEdit: () => void,
    onDelete?: () => void
}

export function ReminderItem({ reminder, canEdit, onEdit, onDelete }: ReminderItemProps) {
    const deleteReminder = useDeleteReminder(reminder.boardId)

    function handleDelete() {
        if (window.confirm(`למחוק את התזכורת: ${reminder.title}`))
            deleteReminder.mutate(reminder.id, { onSuccess: onDelete })
    }

    return <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="subtitle1">{reminder.title}</Typography>
            {canEdit && (
                <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" aria-label="עריכה" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" aria-label="מחיקה" onClick={handleDelete} disabled={deleteReminder.isPending}>
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </Stack>
            )}
        </Stack>

        {reminder.description && (
            <Typography variant="body2" color="text.secondary">{reminder.description}</Typography>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
                size="small"
                variant="outlined"
                color="secondary"
                icon={<NotificationsOutlined />}
                label={formatDateTime(reminder.remindAt)}
            />
        </Stack>

        {deleteReminder.isError && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>המחיקה נכשלה</Typography>
        )}
    </Paper>
}