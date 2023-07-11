import React from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setDisplayedJournalEntry, setNewJournalEntryActive } from './homeSlice';

const JournalEntryMarker = ({ entry }) => {
  const dispatch = useDispatch();

  const handleMarkerClick = (e) => {
    dispatch(setDisplayedJournalEntry({ journalEntryId: entry.id }));
    dispatch(setNewJournalEntryActive({ activeBool: false }));
  };

  return <Marker position={[entry.latitude, entry.longitude]} eventHandlers={{ click: handleMarkerClick }} />;
};

export default JournalEntryMarker;
