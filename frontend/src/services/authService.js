import api from './api';

const authService = {
  register: async (userData) => {
    console.log('Отправка запроса регистрации');
    try {
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error('Не все поля заполнены');
      }

      const response = await api.post('/auth/register', userData);
      console.log('Успешная регистрация:', response.data);

      if (response.data.token) {
        authService.setToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Ошибка регистрации:', message);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      if (!userData.email || !userData.password) {
        throw new Error(`Не все поля заполнены`);
      }
      const response = await api.post('/auth/login', userData);
      console.log('Успешная авторизация:', response.data);

      if (response.data.token) {
        authService.setToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Ошибка авторизации:', error.response?.data || error.message);
      throw error; 
    }
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },
};

export default authService;