interface LogoProps {
    /** 'light' – לרקע כהה (הסרגל העליון), 'dark' – לרקע נייר בהיר */
    tone?: 'light' | 'dark',
    className?: string
}

/**
 * לוגו Save The Date: דף לוח שנה קטן נעוץ בסיכה + שם האתר.
 * בנוי ב-SVG ו-CSS, כך שהוא חד בכל גודל ומשתמש בפונטים של האתר.
 */
export function Logo({ tone = 'dark', className = '' }: LogoProps) {
    return <span className={`logo logo--${tone} ${className}`} dir="ltr">
        <svg className="logo__mark" viewBox="0 0 48 52" aria-hidden="true">
            <defs>
                <radialGradient id="logoPin" cx="35%" cy="30%" r="70%">
                    <stop offset="0" stopColor="#F2A68A" />
                    <stop offset="0.35" stopColor="#D9704E" />
                    <stop offset="1" stopColor="#8E3A20" />
                </radialGradient>
                <linearGradient id="logoPaper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#FFFDF8" />
                    <stop offset="1" stopColor="#F3EAD8" />
                </linearGradient>
            </defs>
            <g transform="rotate(-6 24 28)">
                {/* צל הדף */}
                <rect x="7" y="11" width="35" height="37" rx="5" fill="#3E2A14" opacity="0.28" transform="translate(1.5 2)" />
                {/* הדף */}
                <rect x="6" y="10" width="35" height="37" rx="5" fill="url(#logoPaper)" />
                {/* פס עליון בטרקוטה */}
                <path d="M6 15a5 5 0 0 1 5-5h25a5 5 0 0 1 5 5v5H6z" fill="#C2603F" />
                {/* טבעות */}
                <rect x="13" y="7" width="3" height="7" rx="1.5" fill="#243746" />
                <rect x="31" y="7" width="3" height="7" rx="1.5" fill="#243746" />
                {/* נקודות ימים */}
                <g fill="#243746" opacity="0.22">
                    <circle cx="13" cy="27" r="1.35" /><circle cx="19.5" cy="27" r="1.35" /><circle cx="26" cy="27" r="1.35" /><circle cx="32.5" cy="27" r="1.35" />
                    <circle cx="13" cy="33.5" r="1.35" />
                    <circle cx="13" cy="40" r="1.35" /><circle cx="19.5" cy="40" r="1.35" /><circle cx="26" cy="40" r="1.35" /><circle cx="32.5" cy="40" r="1.35" />
                </g>
                {/* היום השמור – לב קטן מוקף בעיגול "בכתב יד", כמו סימון בטוש על לוח שנה */}
                <path d="M26 36.4C23.1 34.4 22.4 32.7 23.2 31.6C24 30.5 25.5 30.7 26 31.9C26.5 30.7 28 30.5 28.8 31.6C29.6 32.7 28.9 34.4 26 36.4Z" fill="#C2603F" />
                <path
                    d="M31.7 29.9C29.5 27.6 22.5 27.8 20.8 31.6C19.2 35.4 23.3 38.9 28.4 38.2C32.9 37.6 33.8 33.1 31.3 30.3C30.7 29.6 30 29.1 29.1 28.6"
                    fill="none" stroke="#C2603F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                />
            </g>
            {/* הסיכה */}
            <circle cx="24" cy="6.5" r="5" fill="url(#logoPin)" />
            <circle cx="22.4" cy="5" r="1.3" fill="#FFFFFF" opacity="0.55" />
        </svg>
        <span className="logo__text">
            <span className="logo__save">Save the</span>
            <span className="logo__date">Date</span>
        </span>
    </span>
}
