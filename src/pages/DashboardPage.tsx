import { useBoards } from "../features/boards/boardsHooks"
import { Typography, Box, CircularProgress, Button, Alert, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { BoardCard, NewBoardCard } from "../features/boards/BoardCard";
import { BoardDialog } from "../features/boards/BoardDialog";

export function DashboardPage() {
    const [search, setSearch] = useState('')
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const { data: boards, isPending, isError } = useBoards({ search: search })
    if (isPending)
        return <Box className="pending">
            <CircularProgress />
            <span>טוענים את הלוחות...</span>
        </Box>
    if (isError)
        return <Alert severity="error">לא הצלחנו לטעון את הלוחות</Alert>

    return <>
        <header className="page-hero cork-surface wood-frame">
            <div className="page-hero__label">
                <span className="pin pin--green" aria-hidden="true" />
                <Typography variant="h4" component='h1'>הלוחות שלי</Typography>
                <span className="page-hero__sub">
                    {boards.pagination.total === 0 ? 'עוד אין לוחות – זה הזמן לפתוח את הראשון' : `${boards.pagination.total} לוחות על הקיר`}
                </span>
            </div>
            <div className="page-hero__actions">
                <TextField
                    className="page-hero__search"
                    placeholder="חיפוש לפי שם לוח או תיאור"
                    size="small"
                    fullWidth
                    slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }, htmlInput: { 'aria-label': 'חיפוש לפי שם לוח או תיאור' } }}
                    value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsCreateOpen(true)}>לוח חדש</Button>
            </div>
        </header>

        {boards.items.length === 0 && search ? (
            <div className="empty-note">
                <p className="empty-note__title">לא נמצאו לוחות</p>
                <p className="empty-note__text">אין לוח שמתאים לחיפוש "{search}". אפשר לנסות מילה אחרת.</p>
            </div>
        ) : (
            <div className="board-grid stagger">
                {boards.items.map(board => <BoardCard key={board.id} board={board} />)}
                <NewBoardCard onClick={() => setIsCreateOpen(true)} />
            </div>
        )}
        <BoardDialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

    </>
}
