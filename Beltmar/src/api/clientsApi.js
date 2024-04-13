import { beltmarApi } from "./beltmarAPI";

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
    useUpdateClientMutation,
    useDeleteClientMutation,
} = clientsApi;
