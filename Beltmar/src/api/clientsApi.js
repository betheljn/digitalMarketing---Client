import { beltmarApi } from "./beltmarApi";

const clientsApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        createClient: builder.mutation({
            query: (client) => ({
                url: '/api/clients',
                method: 'POST',
                body: client,
            }),
        }),
        getClients: builder.query({
            query: () => '/api/clients',
        }),
        getClientById: builder.query({
            query: (id) => `/api/clients/${id}`,
        }),
        getClientByUserId: builder.query({
            query: () => `/api/clients/me`,
        }),
        updateClient: builder.mutation({
            query: ({ id, ...client }) => ({
                url: `/api/clients/${id}`,
                method: 'PUT',
                body: client,
            }),
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/api/clients/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateClientMutation,
    useGetClientsQuery,
    useGetClientByIdQuery,
    useGetClientByUserIdQuery,
    useUpdateClientMutation,
    useDeleteClientMutation,
} = clientsApi;
