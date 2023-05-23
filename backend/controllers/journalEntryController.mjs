import { JournalEntry } from '../models/journalEntry.model.mjs';
import { default as asyncHandler } from 'express-async-handler';

// @desc Get all journalEntry
// @route GET /journalEntry
// @access Private
const getAllJournalEntrys = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const journalEntrys = await JournalEntry.find().lean();

  // If no users
  if (!journalEntrys?.length) {
    return res.status(400).json({ message: 'No journalEntrys found' });
  }

  res.json(journalEntrys);
});

// @desc Get journalEntry by ID
// @route GET /journalEntry/:id
// @access Private
const getJournalEntryByID = asyncHandler(async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);

    if (!journalEntry) {
      res.status(404).send('JournalEntry not found');
    } else {
      res.status(200).send(journalEntry);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @desc Create new journalEntry
// @route POST /journalEntry
// @access Private
const createNewJournalEntry = asyncHandler(async (req, res) => {
  const { title, date, journalText, latitude, longitude } = req.body;

  // Confirm data
  if (!title || !date || !journalText) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate title
  const duplicate = await JournalEntry.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate journalEntry title' });
  }

  // Create and store the new user
  const journalEntry = await JournalEntry.create({ title, date, journalText, latitude, longitude });

  if (journalEntry) {
    // Created
    return res.status(201).json({ message: 'New JournalEntry created' });
  } else {
    return res.status(400).json({ message: 'Invalid JournalEntry data received' });
  }
});

// @desc Update a JournalEntry
// @route PATCH /journalEntry
// @access Private
const updateJournalEntry = asyncHandler(async (req, res) => {
  const { id, title, date, journalText } = req.body;

  // Confirm data
  if (!id || !title || !date || !journalText) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Does the note exist to update?
  const journalEntry = await JournalEntry.findById(id).exec();

  if (!journalEntry) {
    return res.status(400).json({ message: 'JournalEntry not found' });
  }

  // Check for duplicate
  const duplicate = await JournalEntry.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?.title.toString() !== title) {
    return res.status(409).json({ message: 'Duplicate title' });
  }

  journalEntry.title = title;
  journalEntry.date = date;
  journalEntry.journalText = journalText;

  const updatedJournalEntry = await journalEntry.save();

  res.json({ message: `${updatedJournalEntry.title} updated` });
});

// @desc Delete a JournalEntry
// @route DELETE /journalEntry
// @access Private
const deleteJournalEntry = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'JournalEntry ID required' });
  }

  // Confirm note exists to delete
  const journalEntry = await JournalEntry.findById(id).exec();

  if (!journalEntry) {
    return res.status(400).json({ message: 'JournalEntry not found' });
  }

  const result = await journalEntry.deleteOne();

  const reply = `JournalEntry '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

export { getAllJournalEntrys, createNewJournalEntry, getJournalEntryByID, updateJournalEntry, deleteJournalEntry };
