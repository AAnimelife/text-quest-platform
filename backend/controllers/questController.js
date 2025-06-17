const Quest = require('../models/Quest');
const QuestPage = require('../models/QuestPage');
const createQuest = async (req, res) => {
    try {
        const { title, description, tags, globalVariables, settings } = req.body;

        const quest = new Quest({
            title,
            description,
            tags,
            globalVariables,
            settings,
            assistants: req.user._id,
            author: req.user._id,
        });

        await quest.save();
        console.log("aaa");
        const startPage = new QuestPage({
            questId: quest._id,
            title: 'НАЧАЛО 1',
            content: `Добро пожаловать в квест "${title}"!\n\n${description || 'Без описания.'}\n\nТеги: ${tags && tags.length > 0 ? tags.join(', ') : 'нет'}`,
            choices: [
                {
                    text: 'Начать',
                    nextPage: null,
                    conditions: [],
                    effects: [],
                }
            ],
            isStart: true,
        });
        console.log("aaa");
        await startPage.save();
        quest.pages.push(startPage._id);
        await quest.save();
        res.status(201).json(quest);
    } catch (error) {
        res.status(500).json({ message: 'Error while create a quest: ', error: error.message });
    }
};

const getQuests = async (req, res) => {
    try {
        const quests = await Quest.find({
            $or: [
                { author: req.user._id },
                { assistants: req.user._id }
            ]
        }).lean();

        const result = quests.map(q => ({
            ...q,
            isAssistant: !q.author.equals(req.user._id)
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error while get a quest', error: error.message });
    }
};

const getQuest = async (req, res) => {
    try {
        const { id } = req.params;
        const quest = await Quest.findOne({ _id: id });
        if (!quest) {
            return res.status(404).json({ message: 'Quest not found :(' });
        }
        res.status(200).json(quest);
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
        res.status(500).json({ message: 'Error while update a quest: ', error: error.message });
    }
};

const updateQuestVariables = async (req, res) => {
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

        const quest = await Quest.findOneAndDelete({ _id: id });

        if (!quest) {
            return res.status(404).json({ message: 'Quest not found :(' });
        }

        res.status(200).json({ message: 'Quest was deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Error while delete a quest', error: error.message });
    }
};

module.exports = { createQuest, getQuests, getQuest, updateQuest, deleteQuest, updateQuestVariables };