import { createTheme } from '@mui/material/styles'
import { heIL } from '@mui/material/locale'
export const theme = createTheme(
    {
        direction: 'rtl',
        typography: {
            fontFamily: '"Heebo",sans-serif,Arial'
        }
    },
    heIL
)