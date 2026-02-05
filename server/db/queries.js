import { pool } from "./pool.js";

export const getAllPosts = async () => {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY created_at ASC",
  );

  if (result.rowCount === 0) {
    throw new Error("No posts found");
  }

  return result.rows;
};

export const createPost = async (nombre, descripcion) => {
  const result = await pool.query(
    `INSERT INTO posts (nombre, descripcion) 
    VALUES ($1, $2)
    RETURNING *`,
    [nombre, descripcion],
  );
  if (result.rowCount === 0) {
    throw new Error("Failed to create post");
  }
  return result.rows[0];
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

  console.log(result.rows[0]);

  return result.rows[0];
};
