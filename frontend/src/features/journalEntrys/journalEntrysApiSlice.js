import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const journalEntrysAdapter = createEntityAdapter({});

const initialState = journalEntrysAdapter.getInitialState();

export const journalEntrysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJournalEntrys: builder.query({
      query: () => '/journalEntrys',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedJournalEntrys = responseData.map((journalEntry) => {
          journalEntry.id = journalEntry._id;
          return journalEntry;
        });
        return journalEntrysAdapter.setAll(initialState, loadedJournalEntrys);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{ type: 'JournalEntry', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'JournalEntry', id }))];
        } else return [{ type: 'JournalEntry', id: 'LIST' }];
      },
    }),
    addNewJournalEntry: builder.mutation({
      query: (initialJournalEntryData) => ({
        url: '/journalEntrys',
        method: 'POST',
        body: {
          ...initialJournalEntryData,
        },
      }),
      invalidatesTags: [{ type: 'JournalEntry', id: 'LIST' }],
    }),
    updateJournalEntry: builder.mutation({
      query: (initialJournalEntryData) => ({
        url: '/journalEntrys',
        method: 'PATCH',
        body: {
          ...initialJournalEntryData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'JournalEntry', id: arg.id }],
    }),
    deleteJournalEntry: builder.mutation({
      query: ({ id }) => ({
        url: '/journalEntrys',
        method: 'DELETE',
        body: { id },
      }),
    }),
    invalidatesTags: (result, error, arg) => [{ type: 'JournalEntry', id: arg.id }],
  }),
});

export const { useGetJournalEntrysQuery, useAddNewJournalEntryMutation, useUpdateJournalEntryMutation, useDeleteJournalEntryMutation } =
  journalEntrysApiSlice;

export const selectJournalEntrysResult = journalEntrysApiSlice.endpoints.getJournalEntrys.select();

const selectJournalEntrysData = createSelector(selectJournalEntrysResult, (journalEntrysResult) => journalEntrysResult.data);

export const { selectAll: selectAllJournalEntrys, selectById: selectJournalEntryById } = journalEntrysAdapter.getSelectors(
  (state) => selectJournalEntrysData(state) ?? initialState
);
