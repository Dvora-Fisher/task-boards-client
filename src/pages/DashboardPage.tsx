import { useBoards } from "../features/boards/boardsHooks"
import { Typography, Box, CircularProgress, Button, Alert, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { BoardCard } from "../features/boards/BoardCard";
import { BoardDialog } from "../features/boards/BoardDialog";

export function DashboardPage() {
    const [search, setSearch] = useState('')
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const { data: boards, isPending, isError } = useBoards({ search: search })
    if (isPending)
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    if (isError)
        return <Alert severity="error">לא הצלחנו לטעון את הלוחות</Alert>

    return <>
        <Typography variant="h4" component='h1' sx={{ mb: 3 }}>הלוחות שלי</Typography>
        <Button variant="contained" onClick={() => setIsCreateOpen(true)}>לוח חדש</Button>
        <TextField
            label="חיפוש לפי שם לוח או תיאור"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
            value={search} onChange={(e) => setSearch(e.target.value)} />
        {boards.items.length === 0 ? (
            <Typography color="text.secondary">
                {search ? 'לא נמצאו לוחות' : 'עדיין אין לך לוחות'}
            </Typography>
        ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {boards.items.map(board => <BoardCard key={board.id} board={board} />)}
                </Box>
            </Box>
        )
        }
        <BoardDialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

    </>
}