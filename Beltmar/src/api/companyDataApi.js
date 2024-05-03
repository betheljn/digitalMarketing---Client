import { beltmarApi } from "./beltmarApi";

const companyDataApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        createCompanyData: builder.mutation({
            query: (companyData) => ({
                url: '/api/companydata',
                method: 'POST',
                body: companyData,
            }),
            invalidatesTags: ['companyData'],
        }),
        getCompanyData: builder.query({
            query: () => '/api/companydata/companies',
            providesTags: ['companyData'],
        }),
        getCompanyDataById: builder.query({
            query: (id) => `/api/companydata/companies/${id}`,
            providedTags: ['companyData'],
        }),
        updateCompanyData: builder.mutation({
            query: ({ id, ...companyData }) => ({
                url: `/api/companydata/companies/${id}`,
                method: 'PUT',
                body: companyData,
            }),
            invalidatesTags: ['companyData'],
        }),
        deleteCompanyData: builder.mutation({
            query: (id) => ({
                url: `/api/companydata/companies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['companyData'],
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
