import { useState } from 'react'
import dayjs from 'dayjs'
import { Alert, Box, Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { SearchOutlined, TipsAndUpdatesOutlined } from '@mui/icons-material'
import type { TimeSlot } from '../../types'
import { useSuggestions } from './schedulingHooks'
import { formatTimeRange } from '../../utils/timeFormat'
import { getErrorMessage } from '../../utils/errorMessages'
import { hebrewHint } from '../../utils/hebrewDate'

interface SchedulingSuggestionsProps {
    boardId: string,
    assignedUserId?: string,
    onSelect: (slot: TimeSlot) => void
}

const durationOptions = [15, 30, 45, 60, 90, 120, 180]
const DEFAULT_FROM = '08:00'
const DEFAULT_TO = '20:00'

/* אם שעות החיפוש של היום כבר עברו – מתחילים ממחר */
function defaultDate() {
    const now = dayjs()
    const todayEnd = dayjs(`${now.format('YYYY-MM-DD')}T${DEFAULT_TO}`)
    return (now.isBefore(todayEnd) ? now : now.add(1, 'day')).format('YYYY-MM-DD')
}

export function SchedulingSuggestions({ boardId, assignedUserId, onSelect }: SchedulingSuggestionsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState(defaultDate)
    const [fromTime, setFromTime] = useState(DEFAULT_FROM)
    const [toTime, setToTime] = useState(DEFAULT_TO)
    const [durationMinutes, setDurationMinutes] = useState(60)
    const suggestions = useSuggestions(boardId)

    const now = dayjs()
    const searchFrom = dayjs(`${date}T${fromTime}`)
    const searchTo = dayjs(`${date}T${toTime}`)
    // לא מציעים זמנים שכבר עברו: אם החיפוש מתחיל בעבר, מתחילים מהדקה הבאה
    const effectiveFrom = searchFrom.isBefore(now) ? now.startOf('minute').add(1, 'minute') : searchFrom

    const isOrderValid = !!date && !!fromTime && !!toTime && fromTime < toTime
    const isInPast = isOrderValid && !effectiveFrom.isBefore(searchTo)
    const canSearch = isOrderValid && !isInPast

    function handleSearch() {
        if (!canSearch) return
        suggestions.mutate({
            durationMinutes,
            from: effectiveFrom.toISOString(),
            to: searchTo.toISOString(),
            maxSuggestions: 6,
            assignedUserId,
        })
    }

    if (!isOpen)
        return <Button size="small" className="schedule-finder__open" startIcon={<TipsAndUpdatesOutlined />} onClick={() => setIsOpen(true)} sx={{ alignSelf: 'flex-start' }}>
            הצעות לזמן פנוי
        </Button>

    return <Box
        className="schedule-finder"
        sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}
   
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch() } }}
    >
        <Typography variant="subtitle2" className="schedule-finder__title" sx={{ mb: 1.5 }}>חיפוש זמן פנוי</Typography>

        {/* שתי עמודות: יום + משך בשורה הראשונה, טווח השעות בשנייה */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <TextField type="date" label="יום" size="small" fullWidth value={date} onChange={(e) => setDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} helperText={hebrewHint(date)} />
            <TextField select label="משך" size="small" fullWidth value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))}>
                {durationOptions.map((minutes) => (
                    <MenuItem key={minutes} value={minutes}>
                        {minutes < 60 ? `${minutes} דקות` : minutes === 60 ? 'שעה' : `${minutes / 60} שעות`}
                    </MenuItem>
                ))}
            </TextField>
            <TextField type="time" label="מהשעה" size="small" fullWidth value={fromTime} onChange={(e) => setFromTime(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} error={!isOrderValid} />
            <TextField type="time" label="עד השעה" size="small" fullWidth value={toTime} onChange={(e) => setToTime(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }} error={!isOrderValid} />
        </Box>
        {!isOrderValid && <Typography variant="caption" color="error">שעת הסיום של החיפוש צריכה להיות אחרי שעת ההתחלה</Typography>}
        {isInPast && <Typography variant="caption" color="error">השעות האלה כבר עברו. בחרי יום או שעות אחרים</Typography>}

        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button variant="outlined" size="small" startIcon={<SearchOutlined />} onClick={handleSearch}
                disabled={!canSearch || suggestions.isPending}>
                {suggestions.isPending ? 'מחפשת...' : 'חיפוש'}
            </Button>
            <Button size="small" onClick={() => { setIsOpen(false); suggestions.reset() }}>סגירה</Button>
        </Stack>

        {suggestions.isError && (
            <Alert severity="error" sx={{ mt: 1.5 }}>{getErrorMessage(suggestions.error, 'לא הצלחנו לחפש זמנים פנויים, נסי שוב')}</Alert>
        )}
        {suggestions.isSuccess && (
            suggestions.data.suggestions.length === 0
                ? <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>לא נמצא זמן פנוי — נסי יום או טווח שעות אחר</Typography>
                : <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                    {suggestions.data.suggestions.map((slot) => (
                        <Chip
                            key={slot.startAt}
                            label={formatTimeRange(slot.startAt, slot.endAt)}
                            className="slot-chip"
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