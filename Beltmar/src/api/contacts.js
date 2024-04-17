import { beltmarApi } from "./beltmarApi";

const contactsApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/api/contacts',
        }),
        getContactById: builder.query({
            query: (id) => `/api/contacts/${id}`,   
        }),
        createContact: builder.mutation({
            query: (contact) => ({
                url: 'api/contacts',
                method: 'POST',
                body: contact,
            }),
        }),
        contactForm: builder.mutation({
            query: (contact) => ({
                url: 'api/contactForm/contactForm',
                method: 'POST',
                body: contact,
            }),
        }),
        updateContact: builder.mutation({
            query: ({ id, ...contact }) => ({
                url: `api/contacts/${id}`,
                method: 'PUT',
                body: contact,
            }),
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/api/contacts/${id}`,
                method: 'DELETE',
            }),
        }),
    }), 
}); 
export const {
    useGetContactsQuery,
    useGetContactByIdQuery,
    useCreateContactMutation,
    useContactFormMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactsApi;

