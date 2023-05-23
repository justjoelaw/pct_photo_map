const express = require('express');
const journalEntryController = require('../controllers/journalEntryController.js');

const router = express.Router();

router.get('/', journalEntryController.getAllJournalEntrys);
router.get('/:id', journalEntryController.getJournalEntryByID);
router.post('/', journalEntryController.createNewJournalEntry);
router.patch('/', journalEntryController.updateJournalEntry);
router.delete('/', journalEntryController.deleteJournalEntry);

module.exports = router;
