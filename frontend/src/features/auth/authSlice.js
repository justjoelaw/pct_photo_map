import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, currentUser: null, userLoggedIn: false },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      state.userLoggedIn = true;
    },
    logOut: (state, action) => {
      state.token = null;
      state.userLoggedIn = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectUserLoggedIn = (state) => state.auth.userLoggedIn;
