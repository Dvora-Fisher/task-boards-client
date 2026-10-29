import { Link as RouterLink } from 'react-router-dom'

export function NotFoundPage(){
    return <main className="not-found">
        <div className="empty-note">
            <h1 className="empty-note__title">הדף לא נמצא</h1>
            <p className="empty-note__text">נראה שהפתק הזה נפל מהלוח. אפשר לחזור ללוחות ולהמשיך משם.</p>
            <RouterLink to="/" className="not-found__link">חזרה ללוחות שלי</RouterLink>
        </div>
    </main>
}
