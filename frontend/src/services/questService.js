import api from './api'

const questService = {
    getQuests: async () => {
        try {
            const response = await api.get('/quests');
            return response.data;
        } catch (error) {
            console.error("Error in getQuests: ", error);
            throw error;
        }
    },
    
    createQuests: async (questData) => {
        try {
            const response = await api.post('/quests', questData);
            return response.data;
        } catch (error) {
            console.error("Error in creatQuests: ", error);
            throw error;
        }
    },

    updateQuests: async (id, questData) => {
        try {
            const response = await api.put(`/quests/${id}`, questData);
            return response.data;
        } catch (error) {
            console.error(`Error in updateQuest with id ${id}: `, error);
            throw error;
        }
    },

    deleteQuests: async (id) => {
        try {
            const response = await api.delete(`/quests/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error in deleteQuests with id ${id}`, error);
            throw error;
        }
    }
};

export default questService;