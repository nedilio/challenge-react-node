import { createPost, deletePost, getAllPosts } from "@/lib/data";
import type { Post } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
import { toast } from "sonner";

interface PostsState {
  posts: Array<Post>;
  loading: boolean;
  creating: boolean;
}
const initialState: PostsState = {
  posts: [],
  loading: false,
  creating: false,
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
        console.log("rejected fetch post");
        state.loading = false;
        state.posts = [];
        toast.error("Error al buscar los posts.");
      })
      .addCase(createPostAsync.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.posts.push(action.payload);
        state.creating = false;
        toast.success("Post creado exitosamente.");
      })
      .addCase(createPostAsync.rejected, (state) => {
        state.creating = false;
        toast.error("Error al crear el post. Inténtalo de nuevo.");
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
        state.loading = false;
        toast.success("Post eliminado exitosamente.");
      })

      .addCase(deletePostAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Error al eliminar el post. Inténtalo de nuevo.");
      });
  },
});

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      return await getAllPosts();
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",

  async (newPost: Omit<Post, "id">) => {
    try {
      return await createPost(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },
);

export const { create, eliminate } = postsSlice.actions;
export default postsSlice.reducer;
