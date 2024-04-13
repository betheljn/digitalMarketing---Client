import { createSlice } from '@reduxjs/toolkit';
import { useCreateClientMutation, useGetClientsQuery, useGetClientByIdQuery, useUpdateClientMutation, useDeleteClientMutation } from './beltmarAPI';

const initialState = {
  clients: [],
  client: null,
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all clients
    builder.addCase(useGetClientsQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetClientsQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients; // Assuming the payload contains clients data
    });
    builder.addCase(useGetClientsQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get client by ID
    builder.addCase(useGetClientByIdQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetClientByIdQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload.client; // Assuming the payload contains the client data
    });
    builder.addCase(useGetClientByIdQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Create client
    builder.addCase(useCreateClientMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useCreateClientMutation.fulfilled, (state, action) => {
      state.loading = false;
      state.clients.push(action.payload.client); // Assuming the payload contains the created client
    });
    builder.addCase(useCreateClientMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update client
    builder.addCase(useUpdateClientMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useUpdateClientMutation.fulfilled, (state, action) => {
      state.loading = false;
      const updatedClient = action.payload.client; // Assuming the payload contains the updated client
      state.clients = state.clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      );
    });
    builder.addCase(useUpdateClientMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete client
    builder.addCase(useDeleteClientMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useDeleteClientMutation.fulfilled, (state, action) => {
      state.loading = false;
      const deletedClientId = action.payload.id; // Assuming the payload contains the ID of the deleted client
      state.clients = state.clients.filter((client) => client.id !== deletedClientId);
    });
    builder.addCase(useDeleteClientMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default clientsSlice.reducer;
