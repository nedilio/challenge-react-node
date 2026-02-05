import type { Post } from "@/types/types";
const API_URL = "http://localhost:3000/api/posts";

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};
