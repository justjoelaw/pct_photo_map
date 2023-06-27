import mongoose from 'mongoose';

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
    trail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trail',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create model if it doesn't exist
const JournalEntry = mongoose.models.JournalEntry || mongoose.model('JournalEntry', journalEntrySchema, 'JournalEntry');

export { JournalEntry };
