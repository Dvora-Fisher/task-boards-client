import { CircularPending } from "../../components/CircularPending"
import { useMembers, useRemoveMember } from "./membersHooks"
import { List, ListItem, ListItemAvatar, ListItemText, Chip, IconButton, Alert, Stack, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { useState } from "react";
import { getErrorMessage } from '../../utils/errorMessages';
import type { Member } from '../../types';
import { UserAvatar } from "../../components/UserAvatar";
import { ConfirmDialog } from "../../components/ConfirmDialog";

interface membersListProps {
    boardId: string,
    canManage: boolean
}

export function MembersList({ boardId, canManage }: membersListProps) {
    const { data: members, isPending, isError } = useMembers(boardId)
    const removeMember = useRemoveMember(boardId)
    const [memberToRemove, setMemberToRemove] = useState<Member | null>(null)
    if (isPending)
        return <CircularPending />
    if (isError)
        return <Alert severity="error">לא הצלחנו לטעון את החברים</Alert>;
    function handleRemove(member: Member) {
        removeMember.mutate(member.user.id, { onSettled: () => setMemberToRemove(null) })
    }
    return <Stack spacing={1}>
        {removeMember.isError && <Alert severity="error">{getErrorMessage(removeMember.error, 'לא הצלחנו להסיר את החבר')}</Alert>}
        <List disablePadding className="members-list">
            {members.map(member => (
                <ListItem key={member.user.id} className="members-list__item" secondaryAction={
                    member.isOwner ? (
                        <Chip size="small" className="tag tag--owner" icon={<WorkspacePremiumOutlinedIcon />} label="בעלת הלוח" />
                    ) : canManage ? (
                        <Tooltip title="הסרה מהלוח">
                            <IconButton edge="end" aria-label={`הסרת ${member.user.name} מהלוח`} className="note-actions__delete" disabled={removeMember.isPending} onClick={() => setMemberToRemove(member)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null
                }>
                    <ListItemAvatar><UserAvatar user={member.user} size={40} /></ListItemAvatar>
                    <ListItemText primary={member.user.name} secondary={member.user.email} />
                </ListItem>
            ))}
        </List>
        <ConfirmDialog
            open={memberToRemove !== null}
            title="להסיר מהלוח?"
            confirmLabel="הסרה"
            isPending={removeMember.isPending}
            onConfirm={() => memberToRemove && handleRemove(memberToRemove)}
            onCancel={() => setMemberToRemove(null)}
        >
            {memberToRemove && <>הגישה של <strong>{memberToRemove.user.name}</strong> ללוח תוסר.</>}
        </ConfirmDialog>
    </Stack>
}
