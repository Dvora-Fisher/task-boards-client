import { CircularPending } from "../../components/CircularPending"
import { useMembers, useRemoveMember } from "./membersHooks"
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip, IconButton, Alert, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { getErrorMessage } from '../../utils/errorMessages';
import type { Member } from '../../types';

interface membersListProps {
    boardId: string,
    canManage: boolean
}

export function MembersList({ boardId, canManage }: membersListProps) {
    const { data: members, isPending, isError } = useMembers(boardId)
    const removeMember = useRemoveMember(boardId)
    if (isPending)
        return <CircularPending />
    if (isError)
        return <Alert severity="error">לא הצלחנו לטעון את החברים</Alert>;
    function handleRemove(member: Member) {
        if (window.confirm(`להסיר את ${member.user.name} מהלוח?`))
            removeMember.mutate(member.user.id)
    }
    return <Stack>
        {removeMember.isError && <Alert severity="error">{getErrorMessage(removeMember.error, 'לא הצלחנו להסיר את החבר')}</Alert>}
        <List disablePadding>
            {members.map(member => (
                <ListItem key={member.user.id} secondaryAction={
                    member.isOwner ? (
                        <Chip size="small" color="primary" variant="outlined" label="בעלת הלוח" />
                    ) : canManage ? (
                        <IconButton edge="end" aria-label="הסרה" disabled={removeMember.isPending} onClick={() => handleRemove(member)}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    ) : null
                }>
                    <ListItemAvatar><Avatar sx={{ bgcolor: 'primary.main' }}>{member.user.name.charAt(0)}</Avatar></ListItemAvatar>
                    <ListItemText primary={member.user.name} secondary={member.user.email} />
                </ListItem>
            ))}
        </List>
    </Stack>
}