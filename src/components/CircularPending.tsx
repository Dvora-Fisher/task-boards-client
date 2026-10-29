import { Box, CircularProgress } from "@mui/material"

export function CircularPending(){
    return <Box className="pending" role="status" aria-live="polite">
            <CircularProgress />
            <span>רגע, טוענים...</span>
        </Box>
}
