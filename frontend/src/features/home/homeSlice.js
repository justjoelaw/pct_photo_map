import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { displayedJournalEntry: null, activeTrailId: null, newJournalEntryActive: false, mapClickCoords: [0, 0] },
  reducers: {
    setDisplayedJournalEntry: (state, action) => {
      const { journalEntryId } = action.payload;
      state.displayedJournalEntry = journalEntryId;
    },
    setActiveTrailId: (state, action) => {
      const { trailId } = action.payload;
      state.activeTrailId = trailId;
    },
    setNewJournalEntryActive: (state, action) => {
      const { activeBool } = action.payload;
      state.newJournalEntryActive = activeBool;
    },
    setMapClickCoords: (state, action) => {
      const { coords } = action.payload;
      state.mapClickCoords = coords;
    },
  },
});

export const { setDisplayedJournalEntry, setActiveTrailId, setNewJournalEntryActive, setMapClickCoords } = homeSlice.actions;

export default homeSlice.reducer;

export const selectDisplayedJournalEntry = (state) => state.home.displayedJournalEntry;

export const selectActiveTrailId = (state) => state.home.activeTrailId;

export const selectNewJournalEntryActive = (state) => state.home.newJournalEntryActive;

export const selectMapClickCoords = (state) => state.home.mapClickCoords;
