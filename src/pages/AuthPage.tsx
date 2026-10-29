import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { Tabs, Typography, Tab, Box, Link } from "@mui/material";
import corkboard from '../assets/corkboard.webp'
import { Logo } from "../components/Logo";

export function AuthPage() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const tab = pathname === '/login' ? '/login' : '/register'

    return <div className="auth">
        {/* צד הטופס – ראשון ב-DOM כדי שבמובייל ובקורא מסך הטופס יופיע קודם */}
        <main className="auth__form-side">
            <div className="auth__card">
                <Logo className="auth__logo" />
                <Typography variant="h4" component='h1' className="auth__title">
                    בואו נתחיל
                </Typography>
                <Typography className="auth__subtitle">
                    {tab === '/register'
                        ? 'הרשמה קצרה, ואפשר לפתוח את הלוח הראשון.'
                        : 'מתחברים, וכל הלוחות מחכים בדיוק איפה שהשארתם אותם.'}
                </Typography>
                <Tabs
                    value={tab} onChange={(_, value: string) => navigate(value)}
                    variant="fullWidth"
                    className="auth__tabs"
                >
                    <Tab label='התחברות' value='/login' />
                    <Tab label='הרשמה' value='/register' />
                </Tabs>
                <Box sx={{ mt: 3 }}>
                    {tab === '/login' ? <LoginForm /> : <RegisterForm />}
                </Box>
                <Typography className="auth__switch">
                    {tab === '/login' ? 'עוד אין לך חשבון? ' : 'כבר יש לך חשבון? '}
                    <Link component={RouterLink} to={tab === '/login' ? '/register' : '/login'} replace>
                        {tab === '/login' ? 'להרשמה' : 'להתחברות'}
                    </Link>
                </Typography>
            </div>
        </main>

        {/* צד התדמית – תמונת לוח השעם המקורית, בהירה וללא שכבות כהות */}
        <aside className="auth__showcase" aria-label="על לוחות זמנים">
            <div className="auth__intro">
                <span className="auth__brand">לוחות זמנים</span>
                <h2 className="auth__headline">כל המשימות והזמנים של הצוות, <span className="auth__highlight">על לוח אחד.</span></h2>
                <p className="auth__lead">פותחים לוח, מזמינים את מי שעובד איתכם, ורואים יחד מה מחכה היום, השבוע והחודש.</p>
            </div>

            <figure className="auth__board-wrap">
                <div className="auth__board">
                    <img src={corkboard} alt="לוח שעם עם פתקים צבעוניים, לוח שנה קטן ותמונת נוף" className="auth__board-img" />
                    {/* הטקסטים "כתובים" על הפתקים הריקים שבתמונה */}
                    <div className="board-note board-note--shared">
                        <strong>לוחות משותפים</strong>
                        <span>הרשאות עריכה או צפייה לכל חבר בלוח</span>
                    </div>
                    <div className="board-note board-note--views">
                        <strong>יומן ורשימה</strong>
                        <span>מעבר בלחיצה בין לוח זמנים לרשימת משימות</span>
                    </div>
                    <div className="board-note board-note--reminders">
                        <strong>תזכורות</strong>
                        <span>אף אחד לא שוכח מה צריך לעשות ומתי</span>
                    </div>
                    <div className="board-note board-note--list" aria-hidden="true">
                        <span>✓ היום</span>
                        <span>✓ השבוע</span>
                        <span>✓ החודש</span>
                    </div>
                </div>
            </figure>
        </aside>
    </div>
}
