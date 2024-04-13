import { createSlice } from '@reduxjs/toolkit';
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} from './beltmarAPI';

const initialState = {
    projects: [],
    loading: false,
    error: null,
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get projects
        builder.addCase(useGetProjectsQuery.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(useGetProjectsQuery.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload; // Assuming the payload contains the projects data
        });
        builder.addCase(useGetProjectsQuery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Create project
        builder.addCase(useCreateProjectMutation.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(useCreateProjectMutation.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(useCreateProjectMutation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Get project by ID
        builder.addCase(useGetProjectByIdQuery.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(useGetProjectByIdQuery.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(useGetProjectByIdQuery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Update project
        builder.addCase(useUpdateProjectMutation.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(useUpdateProjectMutation.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(useUpdateProjectMutation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Delete project
        builder.addCase(useDeleteProjectMutation.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(useDeleteProjectMutation.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(useDeleteProjectMutation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default projectsSlice.reducer;
