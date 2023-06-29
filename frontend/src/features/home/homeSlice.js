import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { displayedJournalEntry: null, activeTrailId: null },
  reducers: {
    setDisplayedJournalEntry: (state, action) => {
      const { journalEntryId } = action.payload;
      state.displayedJournalEntry = journalEntryId;
    },
    setActiveTrailId: (state, action) => {
      const { trailId } = action.payload;
      state.activeTrailId = trailId;
    },
  },
});

export const { setDisplayedJournalEntry, setActiveTrailId } = homeSlice.actions;

export default homeSlice.reducer;

export const selectDisplayedJournalEntry = (state) => state.home.displayedJournalEntry;

export const selectActiveTrailId = (state) => state.home.activeTrailId;
