import { beltmarApi } from "./beltmarApi";

const projectsApi = beltmarApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (project) => ({
                url: '/api/projects',
                method: 'POST',
                body: project,
            }),
        }),
        getProjects: builder.query({
            query: () => '/api/projects/projects',
        }),
        getProjectById: builder.query({
            query: (id) => `/api/projects/projects/${id}`,
        }),
        getProjectByClientId: builder.query({
            query: (id) => `/api/projects/client/${id}`,
        }),
        updateProject: builder.mutation({
            query: ({ id, ...project }) => ({
                url: `/api/projects/projects/${id}`,
                method: 'PUT',
                body: project,
            }),
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/api/projects/projects/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useGetProjectByClientIdQuery,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi;
