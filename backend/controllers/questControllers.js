const Quest = require('../models/Quest');

const createQuest = async (req, res) => {
    try {
        const {title, description, tags, globalVariables, settings } = req.body;

        const quest = new Quest({
            title, 
            description, 
            tags, 
            globalVariables, 
            settings,
            author: req.user._id,
        });

        await quest.save();
        res.status(201).json(quest);
    } catch (error) {
        res.status(500).json({ message: 'Error while create a quest: ', error: message });
    }
};

const getQuests = async (req, res) => {
    try {
        const quests = await Quest.find({ author: req.user._id });
        res.status(200).json(quests);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении квестов', error: error.message });
    }
};

const updateQuest = async (req, res) => {

};

const deleteQuest = async (req, res) => {

};

module.exports = { createQuest, getQuests, updateQuest, deleteQuest };