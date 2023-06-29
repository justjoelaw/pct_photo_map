import { JournalEntry } from '../models/JournalEntry.model.js';
import { User } from '../models/User.model.js';
import { Trail } from '../models/Trail.model.js';
import { default as asyncHandler } from 'express-async-handler';

// @desc Get all journalEntry
// @route GET /journalEntry
// @access Private
const getAllJournalEntrys = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  let journalEntrys = await JournalEntry.find().lean();
  console.log(req.userId);

  if (!req.isAdmin) {
    // non-admin cannot request other entrys
    journalEntrys = journalEntrys.filter((entry) => {
      return entry.user.equals(req.userId);
    });
  }

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

    if (!req.isAdmin) {
      if (!journalEntry.user.equals(req.userId)) {
        res.status(403).send('You do not have permission to access this resource');
      }
    }

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
  const { title, date, journalText, latitude, longitude, user, trail, isPublic } = req.body;

  const thisUser = await User.findById(user);

  const thisTrail = await Trail.findById(trail);

  // Confirm data
  if (!title || !date || !journalText || !user || !trail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check thisUser exists
  if (!thisUser) {
    return res.status(400).json({ message: 'User with this User ID does not exist' });
  }

  // Check thisTrail exists
  if (!thisTrail) {
    return res.status(400).json({ message: 'Trail with this Trail ID does not exist' });
  }

  // Check for duplicate title
  const duplicate = await JournalEntry.findOne({ title, user }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate journalEntry title' });
  }

  // Create and store the new trail
  const journalEntry = await JournalEntry.create({ title, date, journalText, latitude, longitude, user, trail, isPublic });

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
  const { id, title, date, journalText, latitude, longitude, trail, isPublic } = req.body;

  // Confirm data
  if (!id || !title || !date || !journalText || !trail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Does the JE exist to update?
  const journalEntry = await JournalEntry.findById(id).exec();

  if (!journalEntry) {
    return res.status(400).json({ message: 'JournalEntry not found' });
  }

  if (!req.isAdmin) {
    if (!journalEntry.user.equals(req.userId)) {
      res.status(403).send('You do not have permission to access this resource');
    }
  }

  const user = journalEntry.user;

  // Check for duplicate
  const duplicate = await JournalEntry.findOne({ title, user }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?.title.toString() !== title) {
    return res.status(409).json({ message: 'Duplicate title' });
  }

  journalEntry.title = title;
  journalEntry.date = date;
  journalEntry.journalText = journalText;
  journalEntry.latitude = latitude;
  journalEntry.longitude = longitude;
  journalEntry.trail = trail;
  journalEntry.isPublic = isPublic;

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

  if (!req.isAdmin) {
    if (!journalEntry.user.equals(req.userId)) {
      res.status(403).send('You do not have permission to access this resource');
    }
  }

  const result = await journalEntry.deleteOne();

  const reply = `JournalEntry '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

export { getAllJournalEntrys, createNewJournalEntry, getJournalEntryByID, updateJournalEntry, deleteJournalEntry };
