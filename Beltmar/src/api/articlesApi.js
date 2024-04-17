import { beltmarApi } from "./beltmarApi";

const articlesApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        createArticle: builder.mutation({
            query: (article) => ({
                url: 'api/articles',
                method: 'POST',
                body: article,
            }),
        }),
        getArticles: builder.query({
            query: () => '/api/articles',
        }),
        getArticlesById: builder.query({
            query: (id) => `/api/articles/${id}`,
        }),
        getRelatedArticles: builder.query({
            query: (id) => `/api/articles/${id}/related`,
        }),
        getFeaturedArticles: builder.query({
            query: () => '/api/articles/featured',
        }),
        updateArticle: builder.mutation({
            query: ({ id, ...article }) => ({
                url: `api/articles/${id}`,
                method: 'PUT',
                body: article,
            }),
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `/api/articles/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateArticleMutation,
    useGetArticlesQuery,
    useGetRelatedArticlesQuery,
    useGetFeaturedArticlesQuery,
    useGetArticlesByIdQuery,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
} = articlesApi;
