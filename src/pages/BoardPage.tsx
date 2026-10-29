import { useBoard } from "../features/boards/boardsHooks"
import { Typography, Box, Alert, Link, Tabs, Tab, Button, Chip } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { TaskList } from "../features/tasks/TaskList"
import { useState } from "react"
import { TaskDialog } from "../features/tasks/TaskDialog"
import { BoardCalendar } from '../features/calendar/BoardCalendar'
import { CircularPending } from "../components/CircularPending"
import { BoardDialog } from "../features/boards/BoardDialog"
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { MembersDialog } from '../features/members/MembersDialog';
import { useParams } from "react-router-dom"
import { ReminderDialog } from "../features/reminders/ReminderDialog"
import { NotificationAddOutlined, AddTaskOutlined, EditOutlined, ArrowForwardOutlined, LockOutlined, VisibilityOutlined, WorkspacePremiumOutlined, CalendarMonthOutlined, ChecklistOutlined, NotificationsOutlined } from '@mui/icons-material';
import { ReminderList } from "../features/reminders/ReminderList"
import { visibilityLabels } from "../features/boards/boardLabels"
import { noteToneFor } from "../utils/noteStyle"


export function BoardPage() {
    const { boardId } = useParams<{ boardId: string }>()
    const [view, setView] = useState<'calendar' | 'list' | 'reminders'>('calendar')
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isMembersOpen, setIsMembersOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)
    const { data: board, isPending, isError } = useBoard(boardId!)
    if (isPending)
        return <CircularPending />
    if (isError)
        return <Alert severity="error">הלוח לא נמצא או שאין לך גישה אליו</Alert>
    return <Box className="board-page">
        <Link component={RouterLink} to='/' className="back-link">
            <ArrowForwardOutlined fontSize="small" />
            לכל הלוחות
        </Link>

        <header className="board-hero cork-surface wood-frame">
            <div className={`board-hero__note note note--${noteToneFor(board.id)}`}>
                <span className="pin pin--red" aria-hidden="true" />
                <div className="board-hero__tags">
                    <Chip size="small" className="tag tag--plain" icon={board.visibility === 'PRIVATE' ? <LockOutlined /> : <GroupOutlinedIcon />} label={visibilityLabels[board.visibility]} />
                    {board.myAccess.canManage
                        ? <Chip size="small" className="tag tag--owner" icon={<WorkspacePremiumOutlined />} label="בניהולי" />
                        : <Chip size="small" className="tag tag--plain" label={`של ${board.owner.name}`} />}
                    {!board.myAccess.canEdit && <Chip size="small" className="tag tag--view" icon={<VisibilityOutlined />} label="צפייה בלבד" />}
                </div>
                <Typography variant="h4" component={'h1'} className="board-hero__title">{board.name}</Typography>
                {board.description && <Typography className="board-hero__desc">{board.description}</Typography>}
            </div>

            <div className="board-hero__actions">
                {board.myAccess.canEdit && <Button variant="contained" startIcon={<AddTaskOutlined />} onClick={() => setIsCreateOpen(true)}>משימה חדשה</Button>}
                {board.myAccess.canEdit && <Button variant="outlined" color="inherit" startIcon={<NotificationAddOutlined />} onClick={() => setIsReminderDialogOpen(true)}>תזכורת חדשה</Button>}
                {board.visibility === 'SHARED' && (
                    <Button variant="outlined" color="inherit" startIcon={<GroupOutlinedIcon />} onClick={() => setIsMembersOpen(true)}>
                        חברים בלוח ({board.memberCount})
                    </Button>
                )}
                {board.myAccess.canManage && <Button variant="outlined" color="inherit" startIcon={<EditOutlined />} onClick={() => setIsEditOpen(true)}>עריכת הלוח</Button>}
            </div>
        </header>

        <section className="workspace">
            <Tabs value={view} onChange={(_, newView) => setView(newView)} className="folder-tabs" variant="scrollable" allowScrollButtonsMobile>
                <Tab label='לוח זמנים' value='calendar' icon={<CalendarMonthOutlined />} iconPosition="start" />
                <Tab label='רשימת משימות' value='list' icon={<ChecklistOutlined />} iconPosition="start" />
                <Tab label='תזכורות' value='reminders' icon={<NotificationsOutlined />} iconPosition="start" />
            </Tabs>
            <div className="workspace__sheet">
                {view === 'calendar' && <BoardCalendar boardId={board.id} canEdit={board.myAccess.canEdit} />}
                {view === 'list' && <TaskList boardId={board.id} canEdit={board.myAccess.canEdit} />}
                {view === 'reminders' && <ReminderList boardId={board.id} canEdit={board.myAccess.canEdit} />}
            </div>
        </section>
        <MembersDialog
            open={isMembersOpen}
            onClose={() => setIsMembersOpen(false)}
            boardId={board.id}
            canManage={board.myAccess.canManage}
        />
        <BoardDialog open={isEditOpen} board={board} onClose={() => setIsEditOpen(false)} />
        <TaskDialog open={isCreateOpen} boardId={board.id} onClose={() => { setIsCreateOpen(false) }} />
        <ReminderDialog open={isReminderDialogOpen} onClose={() => setIsReminderDialogOpen(false)} boardId={board.id} />
    </Box>

}
