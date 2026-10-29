import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { AddMemberForm } from './AddMemberForm';
import { MembersList } from './MembersList';

interface membersDialogProps {
    open: boolean,
    onClose: () => void,
    boardId: string,
    canManage: boolean
}

export function MembersDialog({ open, onClose, boardId, canManage }: membersDialogProps) {
    return <Dialog open={open} onClose={onClose} fullWidth className="members-dialog">
        <DialogTitle>חברים בלוח</DialogTitle>
        <DialogContent>
            {canManage && <AddMemberForm boardId={boardId} />}
            <MembersList boardId={boardId} canManage={canManage} />
        </DialogContent>
    </Dialog>
}