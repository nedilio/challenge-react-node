import type { Post } from "@/types/types";
const API_URL = "http://localhost:3000/api/posts";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
