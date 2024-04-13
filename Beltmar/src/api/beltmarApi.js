import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CREDENTIALS = "credentials";

export const beltmarApi = createApi({
  reducerPath: "beltmarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
    prepareHeaders: (headers, { getState }) => {
      const credentials = JSON.parse(window.sessionStorage.getItem(CREDENTIALS));
      const token = credentials?.token || null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    adminRegister: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register/admin",
        method: "POST",
        body: credentials,
      }),
    }),
    userProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    adminProfile: builder.query({
      query: () => ({
        url: "/auth/admin/profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAdminRegisterMutation,
  useUserProfileQuery,
  useAdminProfileQuery,
} = beltmarApi;

