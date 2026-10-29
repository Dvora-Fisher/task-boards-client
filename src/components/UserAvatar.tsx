import { Avatar, Tooltip } from '@mui/material'
import type { UserSummary } from '../types'
import { avatarToneFor, initials } from '../utils/noteStyle'

interface UserAvatarProps {
    user: UserSummary,
    size?: number
}

export function UserAvatar({ user, size = 32 }: UserAvatarProps) {
    return <Tooltip title={user.name}>
        <Avatar
            className={`avatar-tone-${avatarToneFor(user.id)}`}
            sx={{ width: size, height: size, fontSize: size * 0.4 }}
        >
            {initials(user.name)}
        </Avatar>
    </Tooltip>
}
