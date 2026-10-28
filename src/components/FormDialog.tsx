import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { ReactNode } from "react";

interface formDialogProps{
    open: boolean, onClose: ()=>void, title: string, children?: ReactNode
}

export function FormDialog({open, onClose, title, children}: formDialogProps){
    return <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
             {children}
        </DialogContent>
    </Dialog>
}