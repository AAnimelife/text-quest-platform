import api from './api';

const pageService = {
  getPages: async (questId) => {
    const response = await api.get(`/pages/${questId}`);
    return response.data;
  },

  createPage: async (pageData) => {
    const response = await api.post('/pages', pageData);
    return response.data;
  },

  updatePage: async (id, pageData) => {
    const response = await api.put(`/pages/${id}`, pageData);
    return response.data;
  },

  deletePage: async (id) => {
    const response = await api.delete(`/pages/${id}`);
    return response.data;
  },
};

export default pageService;