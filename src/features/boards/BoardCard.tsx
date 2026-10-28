import type { Board } from "../../types";
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Stack, Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import {visibilityLabels} from '../boards/boardLabels'
interface boardCardProps {
    board: Board
}

export function BoardCard({ board }: boardCardProps) {
    return <Card variant="outlined" sx={{ height: '100%' }}>
        <CardActionArea component={RouterLink} to={`/boards/${board.id}`} sx={{ height: '100%', alignItems: 'flex-start' }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>{board.name}</Typography>
                {board.description && <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{board.description}</Typography>}
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip size="small" variant="outlined" icon={board.visibility === 'PRIVATE' ? <LockOutlinedIcon /> : <GroupOutlinedIcon />} label={visibilityLabels[board.visibility]} />
                    {!board.myAccess.canEdit &&
                        <Chip size="small" color="warning" variant="outlined" icon={<VisibilityOutlinedIcon />} label="צפייה בלבד" />}
                    {board.myAccess.canManage ? 
                        <Chip size="small" color="primary" variant="outlined" icon={<ManageAccountsOutlinedIcon />} label="בניהולי" /> 
                        :<Chip size="small" variant="outlined" label={`של ${board.owner.name}`} />}
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>
}