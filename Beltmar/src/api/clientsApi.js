import { beltmarApi } from "./beltmarApi";

const clientsApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        // Define tags for queries
        getClients: builder.query({
            query: () => '/api/clients',
            providesTags: ['Clients'],
        }),
        getClientById: builder.query({
            query: (id) => `/api/clients/${id}`,
            providesTags: (result, error, id) => [{ type: 'Clients', id }],
        }),
        // Define mutation endpoints with invalidatesTags property
        createClient: builder.mutation({
            query: (client) => ({
                url: '/api/clients',
                method: 'POST',
                body: client,
            }),
            invalidatesTags: ['Clients'], // Invalidate 'Clients' tag upon mutation
        }),
        updateClient: builder.mutation({
            query: ({ id, ...client }) => ({
                url: `/api/clients/${id}`,
                method: 'PUT',
                body: client,
            }),
            invalidatesTags: ['Clients'],
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/api/clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Clients'],
        }),
    }),
});

export const {
    useCreateClientMutation,
    useGetClientsQuery,
    useGetClientByIdQuery,
    useUpdateClientMutation,
    useDeleteClientMutation,
} = clientsApi;

