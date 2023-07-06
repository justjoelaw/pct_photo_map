import Button from '../../../components/Button';
import React from 'react';
import { useDeleteJournalEntryMutation } from '../../journalEntrys/journalEntrysApiSlice';
import { useDispatch } from 'react-redux';
import { setDisplayedJournalEntry } from '../homeSlice';

const DeleteEntryButton = ({ entryId }) => {
  const dispatch = useDispatch();

  const [deleteJournalEntry] = useDeleteJournalEntryMutation();

  const handleClick = async () => {
    await deleteJournalEntry({
      id: entryId,
    });
    dispatch(setDisplayedJournalEntry({ journalEntryId: null }));
  };

  return (
    <Button rounded danger onClick={handleClick}>
      Delete Entry
    </Button>
  );
};

export default DeleteEntryButton;
