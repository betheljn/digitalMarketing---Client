import { createSlice } from '@reduxjs/toolkit';
import { useLoginMutation, useLogoutMutation, useRegisterMutation, useAdminRegisterMutation } from './beltmarApi';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login action
    builder.addCase(useLoginMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useLoginMutation.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Assuming the payload contains user data
    });
    builder.addCase(useLoginMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Logout action
    builder.addCase(useLogoutMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useLogoutMutation.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(useLogoutMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Registration actions
    builder.addCase(useRegisterMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useRegisterMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(useAdminRegisterMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useAdminRegisterMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
