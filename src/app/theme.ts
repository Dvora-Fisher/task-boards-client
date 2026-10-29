import { createTheme } from '@mui/material/styles'
import { heIL } from '@mui/material/locale'

/*
 * Modern Corkboard Studio – ערכת העיצוב של MUI.
 * הצבעים כאן תואמים למשתנים שב-src/styles/tokens.css.
 * (ב-palette חייבים ערכי צבע אמיתיים ולא var(), כי MUI מחשבת מהם גוונים.)
 */
const ink = '#243746'
const inkSoft = '#4C5D6B'
const terracotta = '#C2603F'
const paper = '#FFFDF8'
const cream = '#F8F3E9'
const woodLine = 'rgba(140, 106, 67, 0.32)'

export const theme = createTheme(
    {
        direction: 'rtl',
        palette: {
            mode: 'light',
            primary: { main: terracotta, dark: '#A44E31', light: '#D98466', contrastText: '#FFFFFF' },
            secondary: { main: '#3E7C99', dark: '#2F6680', light: '#7FB0C7', contrastText: '#FFFFFF' },
            success: { main: '#5E8C68', light: '#DCEBDD', contrastText: '#FFFFFF' },
            warning: { main: '#B8862A', light: '#FBEFC9', contrastText: '#FFFFFF' },
            error: { main: '#B5412F', light: '#F8DED8', contrastText: '#FFFFFF' },
            info: { main: '#3E7C99', light: '#DDEDF4', contrastText: '#FFFFFF' },
            text: { primary: ink, secondary: inkSoft, disabled: 'rgba(36, 55, 70, 0.42)' },
            background: { default: cream, paper },
            divider: 'rgba(140, 106, 67, 0.18)',
        },
        shape: { borderRadius: 12 },
        typography: {
            fontFamily: 'var(--font-body)',
            h1: { fontFamily: 'var(--font-display)', fontWeight: 800 },
            h2: { fontFamily: 'var(--font-display)', fontWeight: 800 },
            h3: { fontFamily: 'var(--font-display)', fontWeight: 700 },
            h4: { fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.01em' },
            h5: { fontFamily: 'var(--font-display)', fontWeight: 700 },
            h6: { fontFamily: 'var(--font-display)', fontWeight: 700 },
            subtitle1: { fontWeight: 600 },
            button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
            overline: { fontWeight: 700, letterSpacing: '0.08em' },
        },
        components: {
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        paddingInline: 18,
                        transition: 'background-color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur) var(--ease-out)',
                        '&:active': { transform: 'translateY(1px) scale(0.98)' },
                    },
                },
                variants: [
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            background: 'linear-gradient(180deg, #CC6B4A 0%, #B9583A 100%)',
                            boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 2px 0 #9A4A2F, 0 6px 14px -6px rgba(162, 74, 44, 0.55)',
                            '&:hover': {
                                background: 'linear-gradient(180deg, #C2603F 0%, #AD5133 100%)',
                                boxShadow: '0 1px 0 rgba(255,255,255,0.2) inset, 0 2px 0 #8C4229, 0 10px 18px -8px rgba(162, 74, 44, 0.6)',
                            },
                            '&.Mui-disabled': { background: 'rgba(36, 55, 70, 0.12)', boxShadow: 'none' },
                        },
                    },
                    {
                        props: { variant: 'outlined' },
                        style: {
                            borderWidth: 1.5,
                            backgroundColor: 'rgba(255, 253, 248, 0.7)',
                            '&:hover': { borderWidth: 1.5 },
                        },
                    },
                    { props: { variant: 'outlined', color: 'primary' }, style: { borderColor: 'rgba(194, 96, 63, 0.45)' } },
                    { props: { variant: 'outlined', color: 'inherit' }, style: { borderColor: woodLine } },
                    { props: { variant: 'text', color: 'primary' }, style: { '&:hover': { backgroundColor: 'rgba(194, 96, 63, 0.08)' } } },
                    { props: { size: 'large' }, style: { paddingBlock: 11, fontSize: '1.02rem' } },
                ],
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        transition: 'background-color var(--dur) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
                        '&:hover': { backgroundColor: 'rgba(36, 55, 70, 0.07)' },
                        '&:active': { transform: 'scale(0.92)' },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { backgroundImage: 'none' },
                    outlined: { borderColor: 'rgba(140, 106, 67, 0.2)' },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 14,
                        backgroundColor: paper,
                        backgroundImage: 'var(--texture-paper)',
                        boxShadow: 'var(--shadow-paper)',
                        border: '1px solid rgba(140, 106, 67, 0.16)',
                        overflow: 'visible',
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.35rem',
                        paddingTop: 26,
                        paddingBottom: 8,
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: { root: { paddingBottom: 24 } },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        '&:not(.MuiBackdrop-invisible)': {
                            backgroundColor: 'rgba(62, 42, 20, 0.28)',
                            backdropFilter: 'blur(2px)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.72)',
                        transition: 'background-color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: woodLine,
                            transition: 'border-color var(--dur) var(--ease-out)',
                        },
                        '&:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(140, 106, 67, 0.6)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 0 0 4px rgba(194, 96, 63, 0.12)',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: { root: { color: inkSoft } },
            },
            MuiFormHelperText: {
                styleOverrides: { root: { marginInline: 4 } },
            },
            MuiChip: {
                styleOverrides: {
                    root: { fontWeight: 600, borderRadius: 999 },
                },
                variants: [
                    { props: { size: 'small' }, style: { height: 26, fontSize: '0.78rem' } },
                    { props: { variant: 'outlined' }, style: { backgroundColor: 'rgba(255, 253, 248, 0.75)' } },
                ],
            },
            MuiTabs: {
                styleOverrides: {
                    root: { minHeight: 44 },
                    indicator: { height: 3, borderRadius: 3, backgroundColor: terracotta },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        minHeight: 44,
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        color: inkSoft,
                        '&.Mui-selected': { color: ink },
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(241, 232, 216, 0.7)',
                        borderRadius: 12,
                        padding: 3,
                        gap: 3,
                    },
                    grouped: {
                        border: 0,
                        borderRadius: '9px !important',
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                        textTransform: 'none',
                        color: inkSoft,
                        '&.Mui-selected': {
                            backgroundColor: paper,
                            color: terracotta,
                            boxShadow: 'var(--shadow-xs)',
                            '&:hover': { backgroundColor: '#FFFFFF' },
                        },
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: { borderRadius: 12, alignItems: 'center' },
                },
                variants: [
                    { props: { variant: 'standard', severity: 'error' }, style: { backgroundColor: '#F8DED8', color: '#7A2A1E' } },
                    { props: { variant: 'standard', severity: 'success' }, style: { backgroundColor: '#DCEBDD', color: '#2F5537' } },
                    { props: { variant: 'standard', severity: 'warning' }, style: { backgroundColor: '#FBEFC9', color: '#6E5214' } },
                    { props: { variant: 'standard', severity: 'info' }, style: { backgroundColor: '#DDEDF4', color: '#234C60' } },
                ],
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: { borderRadius: 999, height: 5, backgroundColor: 'rgba(194, 96, 63, 0.15)' },
                    bar: { borderRadius: 999 },
                },
            },
            MuiCircularProgress: {
                defaultProps: { color: 'primary' },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        borderRadius: 12,
                        marginTop: 4,
                        border: '1px solid rgba(140, 106, 67, 0.16)',
                        boxShadow: 'var(--shadow-note)',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        marginInline: 6,
                        '&.Mui-selected': { backgroundColor: 'rgba(194, 96, 63, 0.10)' },
                        '&.Mui-selected:hover': { backgroundColor: 'rgba(194, 96, 63, 0.16)' },
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: { fontWeight: 700, fontSize: '0.95rem' },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: { '&.Mui-checked + .MuiSwitch-track': { opacity: 0.55 } },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: { backgroundColor: ink, fontSize: '0.8rem', borderRadius: 8 },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: { fontWeight: 600, textUnderlineOffset: 3 },
                },
            },
        },
    },
    heIL
)
