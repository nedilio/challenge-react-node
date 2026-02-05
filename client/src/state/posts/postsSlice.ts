import { getAllPosts } from "@/lib/data";
import type { Post } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";

interface PostsState {
  posts: Array<Post>;
  loading: boolean;
}
const initialState: PostsState = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    create: (state, action) => {
      state.posts.push(action.payload);
    },
    eliminate: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return await getAllPosts();
  },
);

export const { create, eliminate } = postsSlice.actions;
export default postsSlice.reducer;
