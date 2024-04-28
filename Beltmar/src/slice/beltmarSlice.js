// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const CREDENTIALS = "credentials";

const initialState = {
  credentials: JSON.parse(
    window.sessionStorage.getItem(CREDENTIALS) || '{"token":"","user":{"userId":null,"admin":false,"image":null}}'
  ),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.credentials.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    // Add a new reducer to store the token in session storage
    storeTokenInSessionStorage(state, action) {
      const { token, user } = action.payload;
      state.credentials = {
        token,
        user: { ...user, userId: user.id }
      };
      window.sessionStorage.setItem(
        CREDENTIALS,
        JSON.stringify({
          token,
          user: { ...user, userId: user.id }
        })
      );
    },
  },
});

export const { setUser, setLoading, setError, storeTokenInSessionStorage } = authSlice.actions;
export default authSlice.reducer;



