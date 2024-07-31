import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage or set to an empty array
const initialState = localStorage.getItem('post')
  ? JSON.parse(localStorage.getItem('post'))
  : { postItems: [] };

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    //add new posts to our local storage when we fetch them from the API
    addToPosts: (state, action) => {
      state.postItems = action.payload;
      localStorage.setItem('post', JSON.stringify(state));
    },
    //delete post from our local storage
    removePost: (state, action) => {
      const id = action.payload;
      state.postItems = state.postItems?.filter(post => post.id.toString() !== id.toString());
      localStorage.setItem('post', JSON.stringify(state));
    },
    //add new post to our local storage
    newPost: (state, action) => {
      state.postItems.unshift(action.payload); 
      localStorage.setItem('post', JSON.stringify(state));
    },
    //update existing post in our local storage
    updatePost: (state, action) => {
      const { id, title, body } = action.payload;
      state.postItems = state.postItems.map(post =>
        post.id.toString() === id.toString()
          ? { ...post, title, body }
          : post
      );
      localStorage.setItem('post', JSON.stringify(state));
    },
  },
});

export const { addToPosts, removePost,  newPost, updatePost } = postSlice.actions;
export default postSlice.reducer;
