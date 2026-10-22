export type BoardVisibility = 'private' | 'public' | 'group'
interface boardMember{
    userId:number,
    userName:string
}

export interface Board{
    id:number,
    title:string,
    description?:string,
    visibility:BoardVisibility,
    ownerId:number,
    members:boardMember[],
    shareToken?:string,
    craetedAt:string
}