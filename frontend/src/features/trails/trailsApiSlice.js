import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const trailsAdapter = createEntityAdapter({});

const initialState = trailsAdapter.getInitialState();

export const trailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrails: builder.query({
      query: () => '/trails',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTrails = responseData.map((trail) => {
          trail.id = trail._id;
          return trail;
        });
        return trailsAdapter.setAll(initialState, loadedTrails);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{ type: 'Trail', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Trail', id }))];
        } else return [{ type: 'Trail', id: 'LIST' }];
      },
    }),
    addNewTrail: builder.mutation({
      query: (initialTrailData) => ({
        url: '/trails',
        method: 'POST',
        body: {
          ...initialTrailData,
        },
      }),
      invalidatesTags: [{ type: 'Trail', id: 'LIST' }],
    }),
    updateTrail: builder.mutation({
      query: (initialTrailData) => ({
        url: '/trails',
        method: 'PATCH',
        body: {
          ...initialTrailData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trail', id: arg.id }],
    }),
    deleteTrail: builder.mutation({
      query: ({ id }) => ({
        url: '/trails',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trail', id: arg.id }],
    }),
  }),
});

export const { useGetTrailsQuery, useAddNewTrailMutation, useUpdateTrailMutation, useDeleteTrailMutation } = trailsApiSlice;

export const selectTrailsResult = trailsApiSlice.endpoints.getTrails.select();
const selectTrailsData = createSelector(selectTrailsResult, (trailsResult) => trailsResult.data);

export const { selectAll: selectAllTrails, selectById: selectTrailById } = trailsAdapter.getSelectors(
  (state) => selectTrailsData(state) ?? initialState
);
