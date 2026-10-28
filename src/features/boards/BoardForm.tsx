import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Stack, TextField, Alert, MenuItem, FormControlLabel, Switch } from '@mui/material'
import type { Board } from "../../types"
import { useCreateBoard } from './boardsHooks'
import { boardSchema, emptyBoardValues, toBoardFormValues, toTBoardInput, type BoardFormValues } from './boardSchemas'
import { useUpdateBoard } from './boardsHooks'
import { visibilityLabels } from './boardLabels'
import { useNavigate } from 'react-router-dom'
import { FormActions } from '../../components/FormActions'

interface BoardFormProrps {
    board?: Board,
    onClose: () => void,
}

export function BoardForm({ board, onClose }: BoardFormProrps) {
    const createBoard = useCreateBoard()
    const updateBoard = useUpdateBoard()
    const navigate = useNavigate()
    const isPending = createBoard.isPending || updateBoard.isPending
    const isError = createBoard.isError || updateBoard.isError
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<BoardFormValues>({
        resolver: zodResolver(boardSchema),
        defaultValues: board ? toBoardFormValues(board) : emptyBoardValues
    });
    const visibility = watch('visibility')
    function onSubmit(values: BoardFormValues) {
        const input = toTBoardInput(values)
        if (board)
            updateBoard.mutate({ boardId: board.id, input }, { onSuccess: onClose })
        else
            createBoard.mutate(input, { onSuccess: ({ id }) => navigate(`/boards/${id}`) })
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} sx={{ pt: 1 }}>
            {isError && (
                <Alert severity="error">לא הצלחנו לשמור את הלוח, נסה שוב</Alert>
            )}

            <TextField
                label="שם הלוח"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                autoFocus
            />

            <TextField
                label="תיאור"
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                multiline
                minRows={2}
            />

            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <TextField {...field} select label="סוג הלוח" fullWidth>
                        {Object.entries(visibilityLabels).map(([value, label]) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </TextField>
                )}
            />

            {visibility === 'SHARED' && (
                <Controller
                    name="isOpen"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label="החברות בלוח יכולות לערוך משימות"
                            control={<Switch checked={field.value} onChange={(_, checked) => field.onChange(checked)} />}
                        />
                    )}
                />
            )}
            <FormActions onCancel={onClose} isPending={isPending} submitLabel={isPending ? 'שומרת...' : board ? 'שמירה' : 'יצירה'}/>
        </Stack>
    )


}