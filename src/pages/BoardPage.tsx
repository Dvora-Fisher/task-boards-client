import { useParams } from "react-router-dom"

export function BoardPage(){
    const params = useParams<{boardId : string}>()
return <h1>לוח {params.boardId}</h1>
}