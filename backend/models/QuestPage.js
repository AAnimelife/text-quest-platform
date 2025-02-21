const mongoose = require('mongoose');

const questPageSchema = new mongoose.Schema({
  questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  choices: [
    {
      text: { type: String, required: true },
      nextPage: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestPage' },
      conditions: [
        {
          variableName: { type: String, required: true },
          operator: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      effects: [
        {
          variableName: { type: String, required: true },
          operator: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuestPage', questPageSchema);