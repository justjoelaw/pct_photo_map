const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    journalText: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema, 'JournalEntry');

module.exports = {
  JournalEntry,
};
