import { beltmarApi } from "./beltmarAPI";

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
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi;
