import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    useTheme,
} from '@mui/material';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const passwordRequirements = {
        hasLowercase: /[a-z]/.test(newPassword),
        hasUppercase: /[A-Z]/.test(newPassword),
        hasNumber: /\d/.test(newPassword),
        hasSymbol: /[^a-zA-Z0-9]/.test(newPassword),
        minLength: newPassword.length >= 8,
    };

    const allValid = Object.values(passwordRequirements).every(Boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!allValid) {
            enqueueSnackbar('Пароль не соответствует требованиям безопасности', { variant: 'warning' });
            return;
        }

        if (newPassword !== confirmPassword) {
            enqueueSnackbar('Пароли не совпадают', { variant: 'warning' });
            return;
        }

        try {
            await userService.changePassword(currentPassword, newPassword);
            enqueueSnackbar('Пароль успешно изменён!', { variant: 'success' });
            navigate('/profile');
        } catch (error) {
            enqueueSnackbar(
                error.response?.data?.message || 'Ошибка при смене пароля',
                { variant: 'error' }
            );
            console.error(error);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Смена пароля
                </Typography>

                <form autoComplete="on" onSubmit={handleSubmit}>
                    <TextField
                        label="Текущий пароль"
                        name="currentPassword"
                        autoComplete="current-password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <TextField
                        label="Новый пароль"
                        name="newPassword"
                        autoComplete="new-password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setIsValidPassword(true);
                        }}
                        error={!allValid && newPassword.length > 0}
                        helperText={
                            !allValid && newPassword.length > 0 && 'Пароль не соответствует требованиям'
                        }
                    />

                    <Box sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 2, ml: 1 }}>
                        Пароль должен:
                        <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: '1.2rem' }}>
                            <li style={{ color: passwordRequirements.minLength ? 'green' : 'inherit' }}>
                                не менее 8 символов
                            </li>
                            <li style={{ color: passwordRequirements.hasLowercase ? 'green' : 'inherit' }}>
                                содержать строчную букву
                            </li>
                            <li style={{ color: passwordRequirements.hasUppercase ? 'green' : 'inherit' }}>
                                содержать заглавную букву
                            </li>
                            <li style={{ color: passwordRequirements.hasNumber ? 'green' : 'inherit' }}>
                                содержать цифру
                            </li>
                            <li style={{ color: passwordRequirements.hasSymbol ? 'green' : 'inherit' }}>
                                содержать символ (например, !@#$)
                            </li>
                        </ul>
                    </Box>


                    <TextField
                        label="Подтвердите новый пароль"
                        name="confirmPassword"
                        autoComplete="new-password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled={!allValid}
                    >
                        Сменить пароль
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ChangePasswordPage;
