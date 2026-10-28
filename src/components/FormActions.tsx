import { Button, Box } from "@mui/material"

interface formActionsProps {
    onCancel: () => void,
    isPending: boolean,
    submitLabel?: string
}

export function FormActions({ onCancel, isPending, submitLabel='שמירה' }: formActionsProps) {
    return <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>ביטול</Button>
        <Button type="submit" variant="contained" disabled={isPending}>{submitLabel}</Button>
    </Box>

}