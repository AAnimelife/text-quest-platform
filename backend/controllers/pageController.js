const QuestPage = require('../models/QuestPage');

const createPage = async (req, res) => {
    try {
        const { questId, title, content, choices } = req.body;

        const page = new QuestPage({
            questId: questId,
            title: title,
            content: content,
            choices: choices,
        });

        await page.save();
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ message: 'Error while creating a page: ', error: error.message });
    }
};

const getPages = async (req, res) => {
    try {
        const { questId } = req.params;
        const pages = await QuestPage.find({ questId: questId });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Error while geting pages: ', error: error.message });
    }
};

const updatePage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, choices } = req.body;

        const page = await QuestPage.findByIdAndUpdate(
            { id: id},
            { title: title, content: content, choices: choices },
            { new: true },
        );

        if (!page) {
            return res.status(404).json({ message: 'Page not found :(' });
        }

        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ message: 'Error while updating a page: ', error: error.message });
    }
};

const deletePage = async (req, res) => {
    try {
        const { id } = req.params;

        const page = await QuestPage.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found :('});
        }

        res.status(200).json({ message: 'Page was deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting a page: ', error: error.message });
    }
};

module.exports = { createPage, getPages, updatePage, deletePage };