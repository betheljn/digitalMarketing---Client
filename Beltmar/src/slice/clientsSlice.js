// clientsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients(state, action) {
      state.clients = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setClients, setLoading, setError } = clientsSlice.actions;
export default clientsSlice.reducer;

