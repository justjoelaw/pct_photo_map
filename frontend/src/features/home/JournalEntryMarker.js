import React from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setDisplayedJournalEntry } from './homeSlice';

const JournalEntryMarker = ({ entry }) => {
  const dispatch = useDispatch();

  const handleMarkerClick = (e) => {
    dispatch(setDisplayedJournalEntry({ journalEntryId: entry.id }));
  };

  return <Marker position={[entry.latitude, entry.longitude]} eventHandlers={{ click: handleMarkerClick }} />;
};

export default JournalEntryMarker;
