import React from 'react';
import { useState, useEffect } from 'react';
import { selectAllTrails } from '../trails/trailsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import TrailSelector from './TrailSelector';
import TrailMap from './TrailMap';
import DisplayJournalEntry from './DisplayJournalEntry';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import useAuth from '../../hooks/useAuth';
import { selectAllJournalEntrys } from '../journalEntrys/journalEntrysApiSlice';
import { selectDisplayedJournalEntry, selectNewJournalEntryActive } from './homeSlice';
import AddEntryButton from './buttons/AddEntryButton';
import { selectActiveTrailId, setActiveTrailId } from './homeSlice';
import NewJournalEntry from '../journalEntrys/NewJournalEntry';

const HomePage = () => {
  const dispatch = useDispatch();
  const trails = useSelector(selectAllTrails);
  const journalEntrys = useSelector(selectAllJournalEntrys);
  const [isLoading, setIsLoading] = useState(true);

  const activeTrailId = useSelector(selectActiveTrailId);
  const [trailId, setTrailId] = useState(activeTrailId ?? null);
  const { userId } = useAuth();

  const displayedJournalEntry = useSelector(selectDisplayedJournalEntry);
  console.log('displayedJournalEntry is', displayedJournalEntry);

  const newJournalEntryActive = useSelector(selectNewJournalEntryActive);
  console.log('newJournalEntryActive is ', newJournalEntryActive);

  useEffect(() => {
    // Account for delay in prefetch
    if (trails && journalEntrys) {
      setIsLoading(false);
      console.log(activeTrailId ?? trails[0]?.id);
      dispatch(setActiveTrailId({ trailId }));
      setTrailId(activeTrailId ?? trails[0]?.id);
    }
  }, [trails, journalEntrys, activeTrailId, dispatch, trailId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredJournalEntrys = journalEntrys.filter((item) => {
    return item.user === userId && item.trail === trailId;
  });

  const loadedContent = (
    <FlexContainer primary className='my-5 grow min-h-0'>
      <FlexContainerRow id='row1'>
        <div id='q1' className='basis-1/2'>
          <TrailSelector trails={trails} trailId={trailId} setTrailId={setTrailId} />
        </div>
        <div id='q2' className='basis-1/2'>
          <FlexContainerRow className='justify-end'>
            <AddEntryButton />
          </FlexContainerRow>
        </div>
      </FlexContainerRow>
      <FlexContainerRow id='row2' className='grow min-h-0'>
        <div id='q3' className='basis-1/2 border-2'>
          <TrailMap trailId={trailId} filteredJournalEntrys={filteredJournalEntrys} />
        </div>
        <div id='q4' className='basis-1/2 h-full'>
          {displayedJournalEntry && <DisplayJournalEntry entryId={displayedJournalEntry} />}
          {newJournalEntryActive && <NewJournalEntry />}
        </div>
      </FlexContainerRow>
    </FlexContainer>
  );

  const content = trails ? loadedContent : <p>Loading...</p>;

  return content;
};

export default HomePage;
