import type { Post } from "@/types/types";

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  });
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};
