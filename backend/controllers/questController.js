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
        res.status(500).json({ message: 'Error while get a quest', error: error.message });
    }
};

const updateQuest = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, globalVariables, settings } = req.body;
        const quest = await Quest.findOneAndUpdate(
            { _id: id, author: req.user._id },
            { title, description, tags, globalVariables, settings },
            { new: true }
        );
        if (!quest) {
            return res.status(404).json({ message: 'Quest not found :(' });
        }

        res.status(200).json(quest);
    } catch (error) {
        console.log('Error while update a quest: ' + error.message)
        res.status(500).json({ message:'Error while update a quest: ', error: error.message });
    }
};

const updateQuestVariables = async(req, res) => {
    try {
        const { id } = req.params;
        const { globalVariables } = req.body;
        
        const quest = Quest.findOne({ _id: id, author: req.author._id });
        
        if (!quest) {
            return res.status(404).json({ message: 'Quest not found :(' });
        }
        
        if (typeof globalVariables !== 'object') {
            return res.status(400).json({ message: 'Invalid format' });
          }

        for (let [key, value] of Object.entries(updates)) {
            if (value === null) {
                quest.globalVariables.delete(key);
            } else {
                quest.globalVariables.set(key, value);
            }
        }

        await quest.save();
        res.status(200).json({ globalVariables: Object.fromEntries(quest.globalVariables) });
    }
    catch (error) {
        console.log('Error while update quest variables: ', error.message);
        res.status(500).json({ message: 'Error while update quest variables: ', error: error.message });
    }
}

const deleteQuest = async (req, res) => {
    try {
        const { id } = req.params;

        const quest = await Quest.findOneAndDelete({ _id: id, author: req.user._id });

        if (!quest) {
            return res.status(404).json({ message: 'Quest not found :(' });
        }

        res.status(200).json({ message: 'Quest was deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Error while delete a quest', error: error.message });
    } 
};

module.exports = { createQuest, getQuests, updateQuest, deleteQuest, updateQuestVariables };