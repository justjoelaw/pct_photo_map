import express from 'express';
import * as journalEntryController from '../controllers/journalEntryController.js';
import verifyJWT from './verifyJWT.js';

const router = express.Router();
router.use(verifyJWT);

router.get('/', journalEntryController.getAllJournalEntrys);
router.get('/:id', journalEntryController.getJournalEntryByID);
router.post('/', journalEntryController.createNewJournalEntry);
router.patch('/', journalEntryController.updateJournalEntry);
router.delete('/', journalEntryController.deleteJournalEntry);

export default router;
