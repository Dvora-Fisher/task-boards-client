import { useState } from 'react'
import dayjs from 'dayjs'
import { Alert, Box, Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { SearchOutlined, TipsAndUpdatesOutlined } from '@mui/icons-material'
import type { TimeSlot } from '../../types'
import { useSuggestions } from './schedulingHooks'
import { formatTimeRange } from '../../utils/timeFormat'
import { getErrorMessage } from '../../utils/errorMessages'

interface SchedulingSuggestionsProps {
    boardId: string,
    assignedUserId?: string,
    onSelect: (slot: TimeSlot) => void
}

const durationOptions = [15, 30, 45, 60, 90, 120, 180]

export function SchedulingSuggestions({ boardId, assignedUserId, onSelect }: SchedulingSuggestionsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [fromTime, setFromTime] = useState('08:00')
    const [toTime, setToTime] = useState('20:00')
    const [durationMinutes, setDurationMinutes] = useState(60)
    const suggestions = useSuggestions(boardId)

    const isRangeValid = !!date && fromTime < toTime

    function handleSearch() {
        const now = dayjs()
        const from = dayjs(`${date}T${fromTime}`)
        suggestions.mutate({
            durationMinutes,
            from: (from.isBefore(now) ? now.startOf('minute').add(1, 'minute') : from).toISOString(),
            to: dayjs(`${date}T${toTime}`).toISOString(),
            maxSuggestions: 6,
            assignedUserId,
        })
    }

    if (!isOpen)
        return <Button size="small" startIcon={<TipsAndUpdatesOutlined />} onClick={() => setIsOpen(true)} sx={{ alignSelf: 'flex-start' }}>
            הצעות לזמן פנוי
        </Button>

    return <Box
        sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (isRangeValid) handleSearch() } }}
    >
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>חיפוש זמן פנוי</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1.3fr 1fr 1fr 1fr' }, gap: 1.5 }}>
            <TextField type="date" label="יום" size="small" value={date} onChange={(e) => setDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} />
            <TextField type="time" label="מהשעה" size="small" value={fromTime} onChange={(e) => setFromTime(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} error={!isRangeValid} />
            <TextField type="time" label="עד השעה" size="small" value={toTime} onChange={(e) => setToTime(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} error={!isRangeValid} />
            <TextField select label="משך" size="small" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))}>
                {durationOptions.map((minutes) => (
                    <MenuItem key={minutes} value={minutes}>
                        {minutes < 60 ? `${minutes} דק'` : `${minutes / 60} שע'`}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
        {!isRangeValid && <Typography variant="caption" color="error">שעת הסיום של החיפוש צריכה להיות אחרי שעת ההתחלה</Typography>}

        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button variant="outlined" size="small" startIcon={<SearchOutlined />} onClick={handleSearch}
                disabled={!isRangeValid || suggestions.isPending}>
                {suggestions.isPending ? 'מחפשת...' : 'חיפוש'}
            </Button>
            <Button size="small" onClick={() => { setIsOpen(false); suggestions.reset() }}>סגירה</Button>
        </Stack>

        {suggestions.isError && (
            <Alert severity="error" sx={{ mt: 1.5 }}>{getErrorMessage(suggestions.error, 'לא הצלחנו לחפש זמנים פנויים, נסה שוב')}</Alert>
        )}
        {suggestions.isSuccess && (
            suggestions.data.suggestions.length === 0
                ? <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>לא נמצא זמן פנוי — נסה יום או טווח שעות אחר</Typography>
                : <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                    {suggestions.data.suggestions.map((slot) => (
                        <Chip
                            key={slot.startAt}
                            label={formatTimeRange(slot.startAt, slot.endAt)}
                            color="primary"
                            variant="outlined"
                            clickable
                            onClick={() => onSelect(slot)}
                        />
                    ))}
                </Stack>
        )}
    </Box>
}