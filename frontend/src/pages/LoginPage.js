import LoginForm from '../components/LoginForm';
import { Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (userData) => {
    try {
      await login(userData);
      enqueueSnackbar('Успешный вход!', { variant: 'success' });
      navigate(from);
    } catch (error) {
      enqueueSnackbar('Ошибка входа', { variant: 'error' });
    }
  };

  return (
    <Container>
      <LoginForm onLogin={handleLogin} />
    </Container>
  );
};


export default LoginPage;