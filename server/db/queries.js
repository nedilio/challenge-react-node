import { pool } from "./pool.js";

export const getAllPosts = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at ASC",
    );

    if (result.rowCount === 0) {
      console.error("No posts found");
      return [];
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

export const createPost = async (nombre, descripcion) => {
  try {
    const result = await pool.query(
      `INSERT INTO posts (nombre, descripcion) 
      VALUES ($1, $2)
      RETURNING *`,
      [nombre, descripcion],
    );
    if (result.rowCount === 0) {
      console.error("Failed to create post");
      throw new Error("Failed to create post");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw new Error("Error creating post");
  }
};

export const deletePostById = async (id) => {
  const result = await pool.query(
    `DELETE FROM posts
   WHERE id = $1
   RETURNING *`,
    [id],
  );

  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }

  return result.rows[0];
};
