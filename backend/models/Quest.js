const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestPage' }],
  globalVariables: { 
    type: Map,
    of: new mongoose.Schema({
      type: String,
      initialValue: mongoose.Schema.Types.Mixed
    }, { _id: false }) 
  },
  settings: {
    randomEvents: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quest', questSchema);