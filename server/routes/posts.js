//routes file for post
import express from "express";
import { createPost, deletePostById, getAllPosts } from "../db/queries.js";

const postsRouter = express.Router();

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

postsRouter.use(loggerMiddleware);

postsRouter.get("/", (req, res) => {
  try {
    const posts = getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postsRouter.post("/", (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = createPost(nombre, descripcion);

    if (result.changes === 0) {
      return res.status(500).json({ error: "Failed to create post" });
    }

    res.status(201).json({
      message: "Post created",
      post: { nombre, descripcion, id: result.lastInsertRowid },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const result = deletePostById(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: `Post with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default postsRouter;
