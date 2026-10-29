import type { CSSProperties } from 'react';
import type { Board, UserSummary } from "../../types";
import { Link as RouterLink } from 'react-router-dom';
import { Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { visibilityLabels } from '../boards/boardLabels'
import { useTasks } from '../tasks/tasksHooks';
import { useMembers } from '../members/membersHooks';
import { UserAvatar } from '../../components/UserAvatar';
import { noteToneFor, pinToneFor, tiltFor } from '../../utils/noteStyle';

interface boardCardProps {
    board: Board
}

export function BoardCard({ board }: boardCardProps) {
    const style = { '--tilt': `${tiltFor(board.id)}deg` } as CSSProperties
    return <RouterLink
        to={`/boards/${board.id}`}
        className={`board-card note note--folded note--${noteToneFor(board.id)}`}
        style={style}
    >
        <span className={`pin pin--${pinToneFor(board.id)}`} aria-hidden="true" />

        <div className="board-card__tags">
            <Chip size="small" className="tag tag--plain" icon={board.visibility === 'PRIVATE' ? <LockOutlinedIcon /> : <GroupOutlinedIcon />} label={visibilityLabels[board.visibility]} />
            {!board.myAccess.canEdit &&
                <Chip size="small" className="tag tag--view" icon={<VisibilityOutlinedIcon />} label="צפייה בלבד" />}
            {board.myAccess.canManage ?
                <Chip size="small" className="tag tag--owner" icon={<WorkspacePremiumOutlinedIcon />} label="בניהולי" />
                : <Chip size="small" className="tag tag--plain" label={`של ${board.owner.name}`} />}
        </div>

        <h2 className="board-card__title">{board.name}</h2>
        {board.description && <p className="board-card__desc">{board.description}</p>}

        <div className="board-card__footer">
            <BoardProgress boardId={board.id} />
            {board.visibility === 'SHARED'
                ? <SharedBoardPeople boardId={board.id} owner={board.owner} />
                : <PeopleStack people={[board.owner]} />}
        </div>
    </RouterLink>
}

/* ---------- התקדמות: נתונים אמיתיים מהמשימות של הלוח ---------- */

function BoardProgress({ boardId }: { boardId: string }) {
    const { data, isPending, isError } = useTasks(boardId)

    if (isPending)
        return <div className="board-card__progress is-loading" aria-hidden="true">
            <div className="progress-track"><div className="progress-fill" /></div>
            <span className="board-card__count">&nbsp;</span>
        </div>
    if (isError)
        return <div className="board-card__progress" />

    const total = data.pagination.total
    const done = data.items.filter((task) => task.status === 'DONE').length
    const percent = total === 0 ? 0 : Math.round((done / total) * 100)

    return <div className="board-card__progress">
        <div
            className="progress-track"
            role="progressbar"
            aria-label="התקדמות המשימות"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
        >
            <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="board-card__count">
            {total === 0 ? 'אין עדיין משימות' : `${done} מתוך ${total} משימות`}
        </span>
    </div>
}

/* ---------- משתתפים ---------- */

function SharedBoardPeople({ boardId, owner }: { boardId: string, owner: UserSummary }) {
    const { data: members } = useMembers(boardId)
    const people = members ? members.map((member) => member.user) : [owner]
    return <PeopleStack people={people} />
}

function PeopleStack({ people }: { people: UserSummary[] }) {
    const visible = people.slice(0, 3)
    const extra = people.length - visible.length
    return <div className="people-stack">
        {visible.map((person) => <UserAvatar key={person.id} user={person} size={30} />)}
        {extra > 0 && <span className="people-stack__more">+{extra}</span>}
    </div>
}

/* ---------- כרטיס "לוח חדש" ---------- */

export function NewBoardCard({ onClick }: { onClick: () => void }) {
    return <button type="button" className="new-board-card" onClick={onClick}>
        <span className="new-board-card__plus" aria-hidden="true">+</span>
        <span className="new-board-card__label">לוח חדש</span>
        <span className="new-board-card__hint">פתק ריק שמחכה למשימות</span>
    </button>
}
