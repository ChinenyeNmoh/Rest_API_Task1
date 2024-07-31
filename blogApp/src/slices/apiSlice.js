import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Create a base query function using fetchBaseQuery and set the base URL to BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" });
export const apiSlice = createApi({
  baseQuery,
  // Define the endpoints for this API slice using a builder function
  endpoints: (builder) => ({}),
});
