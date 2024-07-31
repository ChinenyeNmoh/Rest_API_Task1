import { apiSlice } from "./apiSlice";

export const postSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => {
                // Construct URL based on conditions
                return `/posts?_sort=id&_order=desc`;
            },
            keepUnusedDataFor: 5,
            providesTags: ["Post"],
        }),
        getUsers: builder.query({
            query: () => "/users",
        }),
        getPost: builder.query({
            query: (id) => `/posts/${id}`,
            invalidatesTags: ["Post"],
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: "/posts",
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["Post"],
        }),
        updatePost: builder.mutation({
            query: ({id, ...post}) => ({
                url: `/posts/${id}`,
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["Post"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

export const { useGetPostsQuery, useGetUsersQuery, useGetPostQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postSlice;
