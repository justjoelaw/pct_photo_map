import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
import { Record } from '../models/record.model.js';

const router = express.Router();

// This section will help you get a list of all the records.

router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.send(records);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// This section will help you get a single record by id
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      res.status(404).send('Record not found');
    } else {
      res.status(200).send(record);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// This section will help you create a new record.

router.post('/', async (req, res) => {
  try {
    const newRecord = new Record({
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating record' });
  }
});

// This section will help you update a record by id.
router.patch('/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
      { new: true }
    );

    if (!record) {
      res.status(404).send('Record not found');
    } else {
      res.status(200).send(record);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// This section will help you delete a record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }
    res.send(record);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;
