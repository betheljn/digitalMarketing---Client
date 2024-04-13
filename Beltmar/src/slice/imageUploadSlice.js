import { createSlice } from '@reduxjs/toolkit';
import {
  useUploadImageMutation,
  useGetUploadedImagesQuery,
  useGetImageQuery,
  useDeleteImageMutation,
  useAssociateImageWithArticleMutation,
  useAssociateImageWithProjectMutation,
} from './beltmarAPI';

const initialState = {
  uploadedImages: [],
  loading: false,
  error: null,
};

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get uploaded images
    builder.addCase(useGetUploadedImagesQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetUploadedImagesQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.uploadedImages = action.payload.files; // Assuming the payload contains the list of uploaded images
    });
    builder.addCase(useGetUploadedImagesQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Upload image
    builder.addCase(useUploadImageMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useUploadImageMutation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(useUploadImageMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete image
    builder.addCase(useDeleteImageMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useDeleteImageMutation.fulfilled, (state, action) => {
      state.loading = false;
      const deletedFileName = action.payload.fileName; // Assuming the payload contains the filename of the deleted image
      state.uploadedImages = state.uploadedImages.filter((fileName) => fileName !== deletedFileName);
    });
    builder.addCase(useDeleteImageMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get image
    builder.addCase(useGetImageQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetImageQuery.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(useGetImageQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Associate image with article
    builder.addCase(useAssociateImageWithArticleMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useAssociateImageWithArticleMutation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(useAssociateImageWithArticleMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Associate image with project
    builder.addCase(useAssociateImageWithProjectMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useAssociateImageWithProjectMutation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(useAssociateImageWithProjectMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default imageUploadSlice.reducer;

