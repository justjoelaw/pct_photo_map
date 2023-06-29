import React from 'react';
import { useState, useEffect } from 'react';
import { selectAllTrails } from '../trails/trailsApiSlice';
import { useSelector } from 'react-redux';
import TrailSelector from './TrailSelector';
import TrailMap from './TrailMap';
import DisplayJournalEntry from './DisplayJournalEntry';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import useAuth from '../../hooks/useAuth';
import { selectAllJournalEntrys, useGetJournalEntrysQuery } from '../journalEntrys/journalEntrysApiSlice';
import { selectDisplayedJournalEntry } from './homeSlice';
import { connect } from 'react-redux';
import AddEntryButton from './buttons/AddEntryButton';
import { selectActiveTrailId } from './homeSlice';

const mapStateToProps = (state) => {
  return {
    displayedJournalEntry: state.home.displayedJournalEntry,
  };
};

const HomePage = () => {
  const trails = useSelector(selectAllTrails);
  const journalEntrys = useSelector(selectAllJournalEntrys);
  const [isLoading, setIsLoading] = useState(true);

  const activeTrailId = useSelector(selectActiveTrailId);
  const [trailId, setTrailId] = useState(activeTrailId ?? null);
  const { userId } = useAuth();
  const displayedJournalEntry = useSelector(selectDisplayedJournalEntry);

  useEffect(() => {
    // Account for delay in prefetch
    if (trails && journalEntrys) {
      setIsLoading(false);
      console.log(activeTrailId ?? trails[0]?.id);
      setTrailId(activeTrailId ?? trails[0]?.id);
    }
  }, [trails, journalEntrys]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredJournalEntrys = journalEntrys.filter((item) => {
    return item.user === userId && item.trail === trailId;
  });

  const loadedContent = (
    <FlexContainer>
      <FlexContainerRow>
        <div className='basis-1/2 bg-red-200'>
          <TrailSelector trails={trails} trailId={trailId} setTrailId={setTrailId} />
        </div>
        <div className='basis-1/2 bg-blue-400'>
          <AddEntryButton />
        </div>
      </FlexContainerRow>
      <FlexContainerRow>
        <div className='basis-1/2 bg-red-200'>
          <TrailMap trailId={trailId} filteredJournalEntrys={filteredJournalEntrys} />
        </div>
        <div className='basis-1/2 bg-blue-200'>{displayedJournalEntry && <DisplayJournalEntry entryId={displayedJournalEntry} />}</div>
      </FlexContainerRow>
    </FlexContainer>
  );

  const content = trails ? loadedContent : <p>Loading...</p>;

  return content;
};

export default connect(mapStateToProps)(HomePage);
