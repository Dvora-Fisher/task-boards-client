import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Button, Chip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'

/*
 * "מאחורי הלוח" – עמוד הסבר על האתר: למה הוא נבנה, איך הוא עובד,
 * ההרשאות, הזמנת חברים ושפת הצבעים. עמוד תוכן בלבד – בלי קריאות לשרת.
 */

const steps = [
    { title: 'פותחים לוח', text: 'לוח לכל תחום: הבית, העבודה, אירוע משפחתי או סמסטר. נותנים שם, תיאור קצר, ובוחרים אם הוא פרטי או משותף.', tone: 'yellow' },
    { title: 'נועצים משימות ותזכורות', text: 'משימה יכולה להיות בלי תאריך, ליום מסוים או לטווח שעות, ואפשר לשייך אותה לאנשים מסוימים. תזכורת נקבעת למועד מדויק – ואז היא מחכה לכם בלוח.', tone: 'pink' },
    { title: 'מזמינים שותפים', text: 'בלוח משותף מוסיפים חברים לפי כתובת המייל שאיתה נרשמו, ומחליטים אם יוכלו לערוך או רק לצפות.', tone: 'blue' },
    { title: 'רואים הכול במבט אחד', text: 'עוברים בין לוח הזמנים, רשימת המשימות והתזכורות, ומסמנים "בוצע" – פס ההתקדמות כבר יתמלא מעצמו.', tone: 'mint' },
]

export function AboutPage() {
    return <div className="about">

        {/* ---------- פתיחה ---------- */}
        <header className="about-hero cork-surface wood-frame">
            <div className="about-hero__sheet">
                <span className="pin pin--red" aria-hidden="true" />
                <span className="about-hero__kicker">מאחורי הלוח</span>
                <h1 className="about-hero__title">מקום אחד שבו הזמן מסתדר</h1>
                <p className="about-hero__lead">
                    Save The Date נולד מתוך רצון פשוט: שהמשימות, הפגישות והתזכורות לא יתפזרו על פתקים, הודעות וזיכרון עמוס,
                    אלא ייתלו יחד על לוח אחד ברור – כזה שמכניס סדר, ומשאיר יותר מקום לשקט.
                </p>
            </div>
            <div className="about-hero__notes" aria-hidden="true">
                <span className="about-mini note note--yellow">סדר</span>
                <span className="about-mini note note--blue">שלווה</span>
                <span className="about-mini note note--mint">ביחד</span>
            </div>
        </header>

        {/* ---------- למה ---------- */}
        <section className="about-section" aria-labelledby="about-why">
            <h2 id="about-why" className="about-section__title"><span>למה בנינו את זה</span></h2>
            <div className="about-why">
                <article className="about-card note note--cream">
                    <span className="tape-strip" aria-hidden="true" />
                    <h3>חינם, ובלי אותיות קטנות</h3>
                    <p>כל הלוחות, המשימות, התזכורות והשיתופים פתוחים לשימוש מלא ללא תשלום. אין מסלול "מתקדם" ואין פיצ'רים נעולים – רק כלי שעושה את העבודה.</p>
                </article>
                <article className="about-card note note--cream">
                    <span className="tape-strip" aria-hidden="true" />
                    <h3>לכל תחום בחיים</h3>
                    <p>משק בית, עסק קטן, ועד בית, לימודים, התארגנות לשמחה משפחתית – בכל מקום שבו יש זמנים, אנשים ודברים שצריך לזכור, לוח מסודר עושה את ההבדל.</p>
                </article>
                <article className="about-card note note--cream">
                    <span className="tape-strip" aria-hidden="true" />
                    <h3>פחות לזכור, יותר להספיק</h3>
                    <p>כשהכול כתוב במקום אחד, הראש פנוי. לא צריך לשאול "מי לקח את זה?" או "מתי זה היה?" – מסתכלים על הלוח, ויודעים.</p>
                </article>
            </div>
            <blockquote className="about-quote">
                סדר טוב הוא לא עוד משימה ברשימה – הוא מה שמאפשר לרשימה להיגמר.
            </blockquote>
        </section>

        {/* ---------- איך זה עובד ---------- */}
        <section className="about-section" aria-labelledby="about-how">
            <h2 id="about-how" className="about-section__title"><span>איך זה עובד – בארבעה צעדים</span></h2>
            <ol className="about-steps">
                {steps.map((step, index) => (
                    <li key={step.title} className={`about-step note note--${step.tone} note--folded`}>
                        <span className={`pin pin--${['red', 'green', 'mustard', 'blue'][index]}`} aria-hidden="true" />
                        <span className="about-step__num" aria-hidden="true">{index + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>

        {/* ---------- סוגי לוחות והרשאות ---------- */}
        <section className="about-section" aria-labelledby="about-access">
            <h2 id="about-access" className="about-section__title"><span>סוגי לוחות והרשאות</span></h2>
            <p className="about-section__intro">
                לכל לוח יש בעלת לוח – מי שפתחה אותו. היא קובעת את סוג הלוח, ורק היא יכולה לשנות את פרטיו ולנהל את החברים.
                סוג הלוח קובע מה יכולים לעשות כל השאר:
            </p>

            <div className="about-types">
                <article className="about-type paper-sheet">
                    <div className="about-type__head">
                        <Chip size="small" className="tag tag--plain" icon={<LockOutlinedIcon />} label="פרטי" />
                    </div>
                    <h3>לוח פרטי</h3>
                    <p>רק שלכם. אף אחד אחר לא רואה אותו, ואי אפשר להוסיף אליו חברים. מושלם לרשימות אישיות, ללימודים ולתכנון שקט.</p>
                </article>
                <article className="about-type paper-sheet">
                    <div className="about-type__head">
                        <Chip size="small" className="tag tag--plain" icon={<GroupOutlinedIcon />} label="משותף" />
                    </div>
                    <h3>משותף ופתוח לעריכה</h3>
                    <p>כל החברים בלוח מוסיפים, עורכים ומוחקים משימות ותזכורות. מתאים לצוות קטן, למשפחה או לכל מי שעובדים יחד באמת.</p>
                </article>
                <article className="about-type paper-sheet">
                    <div className="about-type__head">
                        <Chip size="small" className="tag tag--plain" icon={<GroupOutlinedIcon />} label="משותף" />
                        <Chip size="small" className="tag tag--view" icon={<VisibilityOutlinedIcon />} label="צפייה בלבד" />
                    </div>
                    <h3>משותף לצפייה</h3>
                    <p>החברים רואים את כל הלוח – לוח הזמנים, המשימות והתזכורות – אבל רק בעלת הלוח מעדכנת. כמו לוח מודעות מסודר שכולם ניגשים אליו.</p>
                </article>
            </div>

            <div className="about-table-wrap paper-sheet">
                <table className="about-table">
                    <caption>מי יכולה לעשות מה?</caption>
                    <thead>
                        <tr>
                            <th scope="col">פעולה</th>
                            <th scope="col">
                                <Chip size="small" className="tag tag--owner" icon={<WorkspacePremiumOutlinedIcon />} label="בעלת הלוח" />
                            </th>
                            <th scope="col">חברה – לוח פתוח</th>
                            <th scope="col">חברה – צפייה בלבד</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['צפייה בלוח, ביומן ובתזכורות', true, true, true],
                            ['הוספה, עריכה ומחיקה של משימות ותזכורות', true, true, false],
                            ['עריכת שם הלוח, התיאור וסוג הלוח', true, false, false],
                            ['הוספה והסרה של חברים', true, false, false],
                        ].map(([label, owner, member, viewer]) => (
                            <tr key={label as string}>
                                <th scope="row">{label}</th>
                                {[owner, member, viewer].map((allowed, i) => (
                                    <td key={i} data-label={['בעלת הלוח', 'חברה – לוח פתוח', 'חברה – צפייה בלבד'][i]}>
                                        {allowed
                                            ? <span className="about-yes"><CheckRoundedIcon fontSize="small" /><span className="visually-hidden">כן</span></span>
                                            : <span className="about-no"><CloseRoundedIcon fontSize="small" /><span className="visually-hidden">לא</span></span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        {/* ---------- הזמנת חברים ---------- */}
        <section className="about-section" aria-labelledby="about-invite">
            <h2 id="about-invite" className="about-section__title"><span>הזמנת חברים ללוח</span></h2>
            <div className="about-invite">
                <ol className="about-invite__list paper-sheet">
                    <li>נכנסים ללוח המשותף ולוחצים על <strong>"חברים בלוח"</strong> שבראש העמוד.</li>
                    <li>כותבים את <strong>כתובת המייל</strong> שאיתה החברה נרשמה לאתר, ולוחצים "הוספה".</li>
                    <li>מעכשיו הלוח יופיע אצלה ב<strong>"הלוחות שלי"</strong>, עם התגית "של" ושם בעלת הלוח.</li>
                    <li>רוצים לשנות מי עורך? בעריכת הלוח מפעילים או מכבים את האפשרות <strong>"החברות בלוח יכולות לערוך משימות"</strong>.</li>
                </ol>
                <aside className="about-tip note note--yellow">
                    <span className="pin pin--green" aria-hidden="true" />
                    <h3>כדאי לדעת</h3>
                    <ul>
                        <li>אפשר להזמין רק מי שכבר נרשמה לאתר – אם תופיע ההודעה "אין משתמש רשום עם האימייל הזה", בקשו ממנה להירשם קודם.</li>
                        <li>לוח פרטי לא ניתן לשיתוף. כדי להזמין חברים, משנים את סוג הלוח ל"משותף".</li>
                        <li>בעלת הלוח יכולה להסיר חברים בכל עת, דרך אותו חלון.</li>
                    </ul>
                </aside>
            </div>
        </section>

        {/* ---------- שיוך ותזמון ---------- */}
        <section className="about-section" aria-labelledby="about-assign">
            <h2 id="about-assign" className="about-section__title"><span>שיוך משימות וזמן פנוי</span></h2>
            <p className="about-section__intro">
                בלוח משותף לא כל משימה שייכת לכולם. אפשר לומר בדיוק מי אחראית על מה, לשמור משימה אישית רק למי שצריכה לדעת עליה,
                ולתת למערכת למצוא שעה שבה כולן פנויות.
            </p>
            <div className="about-assign">
                <article className="about-feature paper-sheet">
                    <span className="about-feature__icon" aria-hidden="true"><PersonAddAltOutlinedIcon /></span>
                    <h3>משימה עם שם</h3>
                    <p>
                        בטופס המשימה, בשדה <strong>"משויכות"</strong>, בוחרים חברה אחת או יותר מהלוח.
                        השמות יופיעו על הפתק, כל אחת עם עיגול ראשי תיבות בצבע משלה – כך רואים מיד מי מטפלת במה.
                    </p>
                    <div className="about-feature__demo" aria-hidden="true">
                        <Chip size="small" className="tag tag--person" avatar={<Avatar className="avatar-tone-0">רכ</Avatar>} label="רחל כהן" />
                        <Chip size="small" className="tag tag--person" avatar={<Avatar className="avatar-tone-3">של</Avatar>} label="שרה לוי" />
                    </div>
                </article>

                <article className="about-feature paper-sheet">
                    <span className="about-feature__icon" aria-hidden="true"><LockOutlinedIcon /></span>
                    <h3>משימה פרטית</h3>
                    <p>
                        מפעילים את <strong>"גלויה רק למשויכות"</strong>, והמשימה נשארת בין מי שיצרה אותה לבין מי שמשויכות אליה –
                        אפילו בעלת הלוח לא תראה אותה, אלא אם היא יצרה אותה או משויכת אליה. משימה פרטית צריכה לפחות משויכת אחת.
                    </p>
                    <div className="about-feature__demo" aria-hidden="true">
                        <span className="about-private-note note note--yellow">
                            <Chip size="small" className="tag tag--private" icon={<LockOutlinedIcon />} label="פרטית" />
                            <span>מסגרת מקווקוות עדינה מסמנת אותה על הלוח</span>
                        </span>
                    </div>
                </article>

                <article className="about-feature paper-sheet">
                    <span className="about-feature__icon" aria-hidden="true"><TipsAndUpdatesOutlinedIcon /></span>
                    <h3>הצעות לזמן פנוי</h3>
                    <p>
                        במשימה עם <strong>טווח שעות</strong> לוחצים על <strong>"הצעות לזמן פנוי"</strong>, בוחרים יום, משך (מרבע שעה ועד שלוש שעות)
                        וטווח שעות לחיפוש, ומקבלים עד שש הצעות. לחיצה על הצעה ממלאת את שעת ההתחלה והסיום.
                    </p>
                    <div className="about-feature__demo about-slots" aria-hidden="true">
                        <span className="about-slot">09:00–10:00</span>
                        <span className="about-slot">11:30–12:30</span>
                        <span className="about-slot">16:00–17:00</span>
                    </div>
                </article>
            </div>
            <ul className="about-assign__notes">
                <li>ההצעות הן חלונות זמן שלא מתנגשים במשימות עם שעות שכבר נקבעו בלוח הזה.</li>
                <li>זמנים שכבר עברו לא מוצעים – אם השעות של היום חלפו, החיפוש מתחיל ממחר.</li>
                <li>השדות של שיוך ופרטיות מופיעים בלוח משותף שיש בו לפחות חברה אחת מלבד בעלת הלוח.</li>
            </ul>
        </section>

        {/* ---------- שפת הצבעים ---------- */}
        <section className="about-section" aria-labelledby="about-colors">
            <h2 id="about-colors" className="about-section__title"><span>שפת הצבעים</span></h2>
            <p className="about-section__intro">שום צבע כאן לא נבחר במקרה. ככה קוראים את הלוח במבט אחד:</p>

            <div className="about-colors">
                <article className="about-colorcard paper-sheet">
                    <h3>פתקי משימות – לפי הסטטוס</h3>
                    <ul className="about-legend">
                        <li><span className="swatch note note--yellow" aria-hidden="true" /> <strong>צהוב</strong> – לביצוע. כל משימה חדשה מתחילה כאן.</li>
                        <li><span className="swatch note note--blue" aria-hidden="true" /> <strong>תכלת</strong> – בתהליך.</li>
                        <li><span className="swatch note note--mint" aria-hidden="true" /> <strong>מנטה</strong> – בוצע, עם סימן וי וקו על הכותרת.</li>
                    </ul>
                    <p className="about-note">משנים סטטוס – והפתק מחליף צבע מעצמו.</p>
                </article>

                <article className="about-colorcard paper-sheet">
                    <h3>לוח הזמנים</h3>
                    <ul className="about-legend">
                        <li><span className="swatch swatch--dot" style={{ background: '#C2603F' }} aria-hidden="true" /> <strong>טרקוטה</strong> – משימה.</li>
                        <li><span className="swatch swatch--dot" style={{ background: '#3E7C99' }} aria-hidden="true" /> <strong>כחול</strong> – תזכורת, עם פעמון קטן.</li>
                        <li><span className="swatch swatch--dot" style={{ background: '#9DB3A1' }} aria-hidden="true" /> <strong>ירוק־אפור</strong> – משימה שכבר בוצעה.</li>
                    </ul>
                    <p className="about-note">היום הנוכחי מסומן בעיגול טרקוטה, כדי שתמיד יהיה ברור איפה אנחנו.</p>
                </article>

                <article className="about-colorcard paper-sheet">
                    <h3>כרטיסי הלוחות</h3>
                    <div className="about-swatches" aria-hidden="true">
                        <span className="swatch swatch--lg note note--yellow" />
                        <span className="swatch swatch--lg note note--pink" />
                        <span className="swatch swatch--lg note note--blue" />
                        <span className="swatch swatch--lg note note--mint" />
                    </div>
                    <p>כל לוח מקבל אחד מארבעת צבעי הפתקים, ונשאר איתו תמיד – גם אחרי חיפוש או רענון – כך שקל לזהות אותו מרחוק.</p>
                </article>

                <article className="about-colorcard paper-sheet">
                    <h3>תגיות ועדיפות</h3>
                    <div className="about-tags">
                        <Chip size="small" className="tag tag--owner" icon={<WorkspacePremiumOutlinedIcon />} label="בניהולי" />
                        <Chip size="small" className="tag tag--view" icon={<VisibilityOutlinedIcon />} label="צפייה בלבד" />
                        <Chip size="small" className="tag tag--reminder" icon={<NotificationsOutlinedIcon />} label="תזכורת" />
                        <Chip size="small" className="tag tag--private" icon={<LockOutlinedIcon />} label="פרטית" />
                        <Chip size="small" className="tag tag--person" avatar={<Avatar className="avatar-tone-1">שכ</Avatar>} label="משויכת" />
                    </div>
                    <ul className="about-legend about-legend--dots">
                        <li><span className="dot" style={{ background: '#A3482B' }} aria-hidden="true" /> עדיפות גבוהה</li>
                        <li><span className="dot" style={{ background: '#8A6A16' }} aria-hidden="true" /> עדיפות בינונית</li>
                        <li><span className="dot" style={{ background: '#4E7458' }} aria-hidden="true" /> עדיפות נמוכה</li>
                    </ul>
                </article>
            </div>
        </section>

        {/* ---------- טיפים ---------- */}
        <section className="about-section" aria-labelledby="about-tips">
            <h2 id="about-tips" className="about-section__title"><span>עוד כמה דברים קטנים</span></h2>
            <ul className="about-tips">
                <li className="about-tips__item"><strong>פס ההתקדמות</strong> בכל כרטיס לוח מראה כמה משימות כבר בוצעו מתוך כולן, והעיגולים הקטנים לידו הם האנשים שבלוח.</li>
                <li className="about-tips__item"><strong>בלי התנגשויות:</strong> בתוך אותו לוח, שתי משימות עם שעות לא יכולות לחפוף זו לזו. כך לוח הזמנים נשאר אמיתי, והצעות הזמן הפנוי עוזרות למצוא חלון מתאים. בלוחות שונים אפשר לקבוע משימות באותה שעה.</li>
                <li className="about-tips__item"><strong>לחיצה על אירוע</strong> בלוח הזמנים פותחת את הפרטים שלו, ומשם אפשר לערוך או למחוק.</li>
                <li className="about-tips__item"><strong>תזכורות שעברו</strong> לא נמחקות – הן מחכות בצבע עמום יותר, מתחת לתזכורות הקרובות.</li>
                <li className="about-tips__item"><strong>חיפוש</strong> בעמוד "הלוחות שלי" מוצא לוח גם לפי מילה מתוך התיאור שלו.</li>
                <li className="about-tips__item"><strong>תצוגת חודש או שבוע:</strong> בלוח הזמנים בוחרים מה נוח יותר, וכפתור "היום" מחזיר תמיד להווה.</li>
            </ul>
        </section>

        {/* ---------- סיום ---------- */}
        <footer className="about-cta cork-surface wood-frame">
            <div className="about-cta__card note note--pink">
                <span className="pin pin--mustard" aria-hidden="true" />
                <p className="about-cta__hand">הלוח מחכה לכם</p>
                <p className="about-cta__text">כמה דקות של סידור עכשיו – וכל השבוע מרגיש קל יותר.</p>
                <Button component={RouterLink} to="/" variant="contained" size="large" endIcon={<ArrowBackRoundedIcon />}>
                    ללוחות שלי
                </Button>
            </div>
        </footer>
    </div>
}
