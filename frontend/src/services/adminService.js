import api from './api';

const getUsers = async () => {
  const res = await api.get('/admin/users');
  return res.data;
};

const getQuests = async () => {
  const res = await api.get('/admin/quests');
  return res.data;
};

export default {
  getUsers,
  getQuests,
};
