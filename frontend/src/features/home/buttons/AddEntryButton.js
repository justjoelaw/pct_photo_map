import Button from '../../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewJournalEntryActive, setDisplayedJournalEntry } from '../homeSlice';

const AddEntryButton = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // navigate('/journalEntrys/new');
    dispatch(setNewJournalEntryActive({ activeBool: true }));
    dispatch(setDisplayedJournalEntry({ journalEntryId: null }));
  };

  return (
    <Button rounded primary className={className} onClick={handleClick}>
      Add Entry
    </Button>
  );
};

export default AddEntryButton;
