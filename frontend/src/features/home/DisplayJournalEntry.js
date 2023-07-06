import React, { useEffect, useState } from 'react';
import { selectJournalEntryById } from '../journalEntrys/journalEntrysApiSlice';
import { useSelector } from 'react-redux';
import EditEntryButton from './buttons/EditEntryButton';
import DeleteEntryButton from './buttons/DeleteEntryButton';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Header from '../../components/Header';

const DisplayJournalEntry = ({ entryId }) => {
  const [content, setContent] = useState(<p>Loading...</p>);
  console.log('entryId is', entryId);
  const journalEntry = useSelector((state) => selectJournalEntryById(state, entryId));
  console.log('journalEntry is', journalEntry);

  useEffect(() => {
    if (journalEntry) {
      setContent(
        <FlexContainer primary className='h-full'>
          <FlexContainerRow>
            <EditEntryButton entryId={entryId} />
            <DeleteEntryButton entryId={entryId} />
          </FlexContainerRow>
          <FlexContainer className='grow min-h-0'>
            <Header journalEntry>{formatDate(journalEntry?.date)}</Header>
            <Header journalEntry>{journalEntry?.title}</Header>
            <div className='overflow-auto'>{journalEntry?.journalText}</div>
          </FlexContainer>
        </FlexContainer>
      );
    }
  }, [journalEntry, entryId]);

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return content;
};

export default DisplayJournalEntry;
