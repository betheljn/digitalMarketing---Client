import { beltmarApi } from "./beltmarAPI";

const imageUploadApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (image) => ({
                url: '/api/imageUpload/upload',
                method: 'POST',
                body: image,
            }),
        }),
        getUploadedImages: builder.query({
            query: () => '/api/imageUpload/files',
        }),
        getImage: builder.query({
            query: (filename) => `/api/imageUpload/files/${filename}`,
        }),
        deleteImage: builder.mutation({
            query: (filename) => ({
                url: `/api/imageUpload/files/${filename}`,
                method: 'DELETE',
            }),
        }),
        associateImageWithArticle: builder.mutation({
            query: ({ articleId, filename }) => ({
                url: `/api/imageUpload/articles/${articleId}/upload`,
                method: 'PUT',
                body: { filename },
            }),
        }),
        associateImageWithProject: builder.mutation({
            query: ({ projectId, filename }) => ({
                url: `/api/imageUpload/projects/${projectId}/upload`,
                method: 'PUT',
                body: { filename },
            }),
        }),
    }),
});

export const {
    useUploadImageMutation,
    useGetUploadedImagesQuery,
    useGetImageQuery,
    useDeleteImageMutation,
    useAssociateImageWithArticleMutation,
    useAssociateImageWithProjectMutation,
} = imageUploadApi;
