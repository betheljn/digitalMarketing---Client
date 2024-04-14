import { beltmarApi } from "./beltmarApi";

const companyDataApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        createCompanyData: builder.mutation({
            query: (companyData) => ({
                url: '/api/companydata',
                method: 'POST',
                body: companyData,
            }),
        }),
        getCompanyData: builder.query({
            query: () => '/api/companydata/companies',
        }),
        getCompanyDataById: builder.query({
            query: (id) => `/api/companydata/companies/${id}`,
        }),
        updateCompanyData: builder.mutation({
            query: ({ id, ...companyData }) => ({
                url: `/api/companydata/companies/${id}`,
                method: 'PUT',
                body: companyData,
            }),
        }),
        deleteCompanyData: builder.mutation({
            query: (id) => ({
                url: `/api/companydata/companies/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateCompanyDataMutation,
    useGetCompanyDataQuery,
    useGetCompanyDataByIdQuery,
    useUpdateCompanyDataMutation,
    useDeleteCompanyDataMutation,
} = companyDataApi;
