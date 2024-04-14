// companyDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyDataList: [],
  loading: false,
  error: null,
};

const companyDataSlice = createSlice({
  name: 'companyData',
  initialState,
  reducers: {
    setCompanyDataList(state, action) {
      state.companyDataList = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCompanyDataList, setLoading, setError } = companyDataSlice.actions;
export default companyDataSlice.reducer;

