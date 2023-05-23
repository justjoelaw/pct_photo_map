import express from 'express';
import * as journalEntryController from '../controllers/journalEntryController.mjs';

const router = express.Router();

router.get('/', journalEntryController.getAllJournalEntrys);
router.get('/:id', journalEntryController.getJournalEntryByID);
router.post('/', journalEntryController.createNewJournalEntry);
router.patch('/', journalEntryController.updateJournalEntry);
router.delete('/', journalEntryController.deleteJournalEntry);

export default router;
