import { createSlice } from '@reduxjs/toolkit';
import { 
  useCreateCompanyDataMutation, 
  useGetCompanyDataQuery, 
  useGetCompanyDataByIdQuery, 
  useUpdateCompanyDataMutation, 
  useDeleteCompanyDataMutation 
} from './beltmarAPI';

const initialState = {
  companyDataList: [],
  companyData: null,
  loading: false,
  error: null,
};

const companyDataSlice = createSlice({
  name: 'companyData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all company data
    builder.addCase(useGetCompanyDataQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetCompanyDataQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.companyDataList = action.payload.companyData; // Assuming the payload contains company data list
    });
    builder.addCase(useGetCompanyDataQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get company data by ID
    builder.addCase(useGetCompanyDataByIdQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetCompanyDataByIdQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.companyData = action.payload.companyData; // Assuming the payload contains company data
    });
    builder.addCase(useGetCompanyDataByIdQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Create company data
    builder.addCase(useCreateCompanyDataMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useCreateCompanyDataMutation.fulfilled, (state, action) => {
      state.loading = false;
      state.companyDataList.push(action.payload.companyData); // Assuming the payload contains the created company data
    });
    builder.addCase(useCreateCompanyDataMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update company data
    builder.addCase(useUpdateCompanyDataMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useUpdateCompanyDataMutation.fulfilled, (state, action) => {
      state.loading = false;
      const updatedCompanyData = action.payload.companyData; // Assuming the payload contains the updated company data
      state.companyDataList = state.companyDataList.map((companyData) =>
        companyData.id === updatedCompanyData.id ? updatedCompanyData : companyData
      );
    });
    builder.addCase(useUpdateCompanyDataMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete company data
    builder.addCase(useDeleteCompanyDataMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useDeleteCompanyDataMutation.fulfilled, (state, action) => {
      state.loading = false;
      const deletedCompanyId = action.payload.id; // Assuming the payload contains the ID of the deleted company data
      state.companyDataList = state.companyDataList.filter((companyData) => companyData.id !== deletedCompanyId);
    });
    builder.addCase(useDeleteCompanyDataMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default companyDataSlice.reducer;
