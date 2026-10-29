import { Button, Box } from "@mui/material"

interface formActionsProps {
    onCancel: () => void,
    isPending: boolean,
}

export function FormActions({ onCancel, isPending }: formActionsProps) {
    return <Box className="form-actions" sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>ביטול</Button>
        <Button type="submit" variant="contained" disabled={isPending}>{isPending ? 'שומר...' : 'שמירה' }</Button>
    </Box>

}