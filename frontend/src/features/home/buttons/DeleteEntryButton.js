import Button from '../../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteJournalEntryMutation } from '../../journalEntrys/journalEntrysApiSlice';
import { useDispatch } from 'react-redux';
import { setDisplayedJournalEntry } from '../homeSlice';

const DeleteEntryButton = ({ entryId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteJournalEntry, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteJournalEntryMutation();

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
