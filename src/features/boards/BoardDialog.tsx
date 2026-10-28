import type { Board } from "../../types";
import { BoardForm } from './BoardForm';
import { FormDialog } from '../../components/FormDialog'

interface boardDialogProps{
    board?: Board,
    open: boolean,
    onClose: ()=> void
}

export function BoardDialog({board, open, onClose}: boardDialogProps){
    return <FormDialog
        title={board? 'עריכת לוח' : 'יצירת לוח'}
        open={open} onClose={onClose}
        children={<BoardForm onClose={onClose} board={board}/>}>

    </FormDialog>    
}
