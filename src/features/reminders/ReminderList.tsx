import { useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Stack, Typography } from '@mui/material';
import type { Reminder } from '../../types';
import { useReminders } from './reminderHooks';
import { ReminderItem } from './ReminderItem';
import { ReminderDialog } from './ReminderDialog';
import { CircularPending } from '../../components/CircularPending';

interface ReminderListProps {
    boardId: string,
    canEdit: boolean
}

export function ReminderList({ boardId, canEdit }: ReminderListProps) {
    const { data, isPending, isError } = useReminders(boardId)
    const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)

    if (isPending)
        return <CircularPending />
    if (isError)
        return <Alert severity="error">לא הצלחנו לטעון את התזכורות</Alert>
    if (data.items.length === 0)
        return <div className="empty-note">
            <p className="empty-note__title">אין עדיין תזכורות</p>
            <p className="empty-note__text">תזכורת חדשה תופיע כאן, וגם בלוח הזמנים.</p>
        </div>

    const now = dayjs()
    const upcoming = data.items.filter((r) => dayjs(r.remindAt).isAfter(now))
    const past = data.items.filter((r) => !dayjs(r.remindAt).isAfter(now)).reverse()

    const sections = [
        { title: 'קרובות', items: upcoming, faded: false },
        { title: 'שעברו', items: past, faded: true },
    ]

    return <>
        <Stack spacing={3}>
            {sections.map((section) => section.items.length > 0 && (
                <Stack key={section.title} spacing={1.5}>
                    <Typography variant="overline" component="h2" className="section-label">
                        {section.title} ({section.items.length})
                    </Typography>
                    <div className={`note-grid stagger${section.faded ? ' note-grid--past' : ''}`}>
                        {section.items.map((reminder) => (
                            <ReminderItem
                                key={reminder.id}
                                reminder={reminder}
                                canEdit={canEdit}
                                onEdit={() => setEditingReminder(reminder)}
                            />
                        ))}
                    </div>
                </Stack>
            ))}
        </Stack>
        {editingReminder && (
            <ReminderDialog
                open
                boardId={boardId}
                reminder={editingReminder}
                onClose={() => setEditingReminder(null)}
            />
        )}
    </>
}