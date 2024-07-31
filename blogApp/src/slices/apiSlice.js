import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Create a base query function using fetchBaseQuery and set the base URL to BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" });
export const apiSlice = createApi({
  baseQuery,
  // Define tag types used for cache invalidation and data refetching
  tagTypes: ['Post'],
  // Define the endpoints for this API slice using a builder function
  endpoints: (builder) => ({}),
});
