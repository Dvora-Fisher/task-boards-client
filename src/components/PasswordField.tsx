import { useState } from 'react';
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

export function PasswordField(props: TextFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    return <TextField
        {...props}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
            ...props.slotProps,
            input: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            aria-label={showPassword ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                        </IconButton>
                    </InputAdornment>
                ),
            },
        }}
    />
}