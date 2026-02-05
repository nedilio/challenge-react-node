import database from "./model.js";

export const getAllPosts = () => {
  const getPostsQuery = database.prepare("SELECT * FROM posts");
  const posts = getPostsQuery.all();
  return posts;
};

export const createPost = (title, content) => {
  const addPostQuery = database.prepare(
    "INSERT INTO posts (nombre, descripcion) VALUES (?, ?)",
  );
  const res = addPostQuery.run(title, content);
  return res;
};

export const deletePostById = (id) => {
  const deletePostQuery = database.prepare("DELETE FROM posts WHERE id = ?");
  const res = deletePostQuery.run(id);
  return res;
};
