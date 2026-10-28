import { z } from 'zod'
import type { CreateBoardInput, Board } from "../../types"

export const boardSchema = z.object({
    name: z.string().trim().min(1, 'נא להזין שם').max(100, 'עד 100 תווים'),
    description: z.string(),
    visibility: z.enum(['PRIVATE', 'SHARED']),
    isOpen: z.boolean(),
})

export type BoardFormValues = z.infer<typeof boardSchema>

export const emptyBoardValues : BoardFormValues = {
    name: '',
    description: '',
    visibility: 'PRIVATE',
    isOpen:false
}

export function toTBoardInput(values: BoardFormValues): CreateBoardInput{
    return {
        name: values.name,
        description: values.description !== '' ? values.description : null,
        visibility: values.visibility,
        isOpen: values.isOpen
    }
}

export function toBoardFormValues(board: Board): BoardFormValues {
  return {
    name: board.name,
    description: board.description ?? '',
    visibility: board.visibility,
    isOpen: board.isOpen,
  };
}