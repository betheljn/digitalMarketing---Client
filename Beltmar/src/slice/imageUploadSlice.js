// imageUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedImages: [],
  loading: false,
  error: null,
};

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;


