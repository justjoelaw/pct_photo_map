import React from 'react';
import { selectJournalEntryById } from '../journalEntrys/journalEntrysApiSlice';
import { useSelector } from 'react-redux';

const DisplayJournalEntry = ({ entryId }) => {
  const journalEntry = useSelector((state) => selectJournalEntryById(state, entryId));
  console.log(entryId);
  console.log(journalEntry);

  return (
    <>
      <h1>{journalEntry?.title}</h1>
      <div>{journalEntry.date}</div>
      <div>{journalEntry.journalText}</div>
    </>
  );
};

export default DisplayJournalEntry;
