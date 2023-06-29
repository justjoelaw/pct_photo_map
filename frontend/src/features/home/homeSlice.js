import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { displayedJournalEntry: null },
  reducers: {
    setDisplayedJournalEntry: (state, action) => {
      const { journalEntryId } = action.payload;
      state.displayedJournalEntry = journalEntryId;
    },
  },
});

export const { setDisplayedJournalEntry } = homeSlice.actions;

export default homeSlice.reducer;

export const selectDisplayedJournalEntry = (state) => state.home.displayedJournalEntry;
