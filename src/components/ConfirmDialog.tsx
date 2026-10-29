import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import type { ReactNode } from "react"

interface ConfirmDialogProps {
    open: boolean,
    title: string,
    children: ReactNode,
    confirmLabel?: string,
    isPending?: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

/** חלון אישור מעוצב – מחליף את window.confirm של הדפדפן */
export function ConfirmDialog({ open, title, children, confirmLabel = 'מחיקה', isPending = false, onConfirm, onCancel }: ConfirmDialogProps) {
    return <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth className="confirm-dialog">
        <DialogTitle sx={{ textAlign: 'center' }}>
            <span className="confirm-dialog__icon" aria-hidden="true"><DeleteOutlineOutlinedIcon /></span>
            {title}
        </DialogTitle>
        <DialogContent className="confirm-dialog__text">{children}</DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
            <Button onClick={onCancel} autoFocus>ביטול</Button>
            <Button variant="contained" color="error" onClick={onConfirm} disabled={isPending}>{confirmLabel}</Button>
        </DialogActions>
    </Dialog>
}
