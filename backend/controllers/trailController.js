import { Trail } from '../models/Trail.model.js';
import { JournalEntry } from '../models/JournalEntry.model.js';
import { default as asyncHandler } from 'express-async-handler';

// @desc Get all trails
// @route GET /trails
// @access Private
const getAllTrails = asyncHandler(async (req, res) => {
  // Get all trails from MongoDB
  const trails = await Trail.find().select('-password').lean();

  // If no trails
  if (!trails?.length) {
    return res.status(400).json({ message: 'No trails found' });
  }

  res.json(trails);
});

// @desc Create new trail
// @route POST /trails
// @access Private
const createNewTrail = asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    res.status(403).send('You do not have permission to access this resource');
  }

  const { name } = req.body;

  // Confirm data
  if (!name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate name
  const duplicate = await Trail.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate trail name' });
  }

  // Create and store new trail
  const trail = await Trail.create({ name });

  if (trail) {
    //created
    res.status(201).json({ message: `New trail ${name} created` });
  } else {
    res.status(400).json({ message: 'Unable to create trail' });
  }
});

// @desc Update a trail
// @route PATCH /trails
// @access Private
const updateTrail = asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    res.status(403).send('You do not have permission to access this resource');
  }

  const { id, name } = req.body;

  // Confirm data
  if (!id || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Does the trail exist to update?
  const trail = await Trail.findById(id).exec();

  if (!trail) {
    return res.status(400).json({ message: 'Trail not found' });
  }

  // Check for duplicate
  const duplicate = await Trail.findOne({ name }).lean().exec();

  // Allow updates to the original trail
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate name' });
  }

  trail.name = name;

  const updatedTrail = await trail.save();

  res.json({ message: `${updatedTrail.name} updated` });
});

// @desc Delete a trail
// @route DELETE /trails
// @access Private
const deleteTrail = asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    res.status(403).send('You do not have permission to access this resource');
  }

  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Trail ID Required' });
  }

  // Does the trail still have JournalEntrys
  const journalEntry = await JournalEntry.findOne({ trail: id }).lean().exec();
  if (journalEntry) {
    return res.status(400).json({ message: 'Trail has assigned JournalEntrys' });
  }

  // Does the trail exist to delete?
  const trail = await Trail.findById(id).exec();

  if (!trail) {
    return res.status(400).json({ message: 'Trail not found' });
  }

  const result = await trail.deleteOne();

  const reply = `Trail ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
});

export { getAllTrails, createNewTrail, updateTrail, deleteTrail };
