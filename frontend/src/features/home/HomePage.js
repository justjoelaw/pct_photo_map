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

const mapStateToProps = (state) => {
  return {
    displayedJournalEntry: state.home.displayedJournalEntry,
  };
};

const HomePage = () => {
  const trails = useSelector(selectAllTrails);
  const [trailId, setTrailId] = useState(trails[0].id);

  const { userId } = useAuth();

  const journalEntrys = useSelector(selectAllJournalEntrys);
  const filteredJournalEntrys = journalEntrys.filter((item) => {
    return item.user === userId && item.trail === trailId;
  });

  const displayedJournalEntry = useSelector(selectDisplayedJournalEntry);

  const loadedContent = (
    <FlexContainer>
      <TrailSelector trails={trails} trailId={trailId} setTrailId={setTrailId} />
      <FlexContainerRow>
        <div className='basis-1/2 bg-red-200'>
          <TrailMap trailId={trailId} filteredJournalEntrys={filteredJournalEntrys} />
        </div>
        <div className='basis-1/2 bg-blue-200'>
          <DisplayJournalEntry entryId={displayedJournalEntry} />
        </div>
      </FlexContainerRow>
    </FlexContainer>
  );

  const content = trails ? loadedContent : <p>Loading...</p>;

  return content;
};

export default connect(mapStateToProps)(HomePage);
