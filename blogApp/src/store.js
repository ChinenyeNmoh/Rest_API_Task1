import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import postSliceReducer from './slices/postSlice';

// Create a Redux store with our reducers and middleware
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    post: postSliceReducer,
  },
  /*This configures the middleware for the Redux store. It starts with the default middleware provided 
  by Redux Toolkit (getDefaultMiddleware) and then adds (concat) the middleware required by the apiSlice. */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;