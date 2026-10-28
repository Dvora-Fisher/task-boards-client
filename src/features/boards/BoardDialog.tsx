import type { Board } from "../../types";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { BoardForm } from './BoardForm';

interface boardDialogProps{
    board?: Board,
    open: boolean,
    onClose: ()=> void
}

export function BoardDialog({board, open, onClose}: boardDialogProps){
    return <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>{board? 'עריכת לוח' : 'יצירת לוח'}</DialogTitle>
        <DialogContent>
            <BoardForm onClose={onClose} board={board}/>
        </DialogContent>
    </Dialog>
}
