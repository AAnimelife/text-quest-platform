import api from './api';

const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

export default userService;
