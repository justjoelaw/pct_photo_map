import React from 'react';
import { selectJournalEntryById } from '../journalEntrys/journalEntrysApiSlice';
import { useSelector } from 'react-redux';
import EditEntryButton from './buttons/EditEntryButton';
import DeleteEntryButton from './buttons/DeleteEntryButton';

const DisplayJournalEntry = ({ entryId }) => {
  const journalEntry = useSelector((state) => selectJournalEntryById(state, entryId));
  console.log(entryId);
  console.log(journalEntry);

  return (
    <>
      <h1>{journalEntry?.title}</h1>
      <div>{journalEntry.date}</div>
      <div>{journalEntry.journalText}</div>
      <EditEntryButton entryId={entryId} />
      <DeleteEntryButton entryId={entryId} />
    </>
  );
};

export default DisplayJournalEntry;
