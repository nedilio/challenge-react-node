//routes file for post
import express from "express";
import { createPost, deletePostById, getAllPosts } from "../db/queries.js";
import { validatePost } from "../middlewares/validate.js";

const postsRouter = express.Router();

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

const validateInputMiddleware = (req, res, next) => {
  const { nombre, descripcion } = req.body;
  const valid = validatePost({ nombre, descripcion });
  if (!valid.success) {
    console.log("Validation failed:", valid.error);
    const formattedErrors = valid.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
      minimum: issue.minimum,
    }));
    return res.status(400).json({
      error: "Validation failed",
      details: formattedErrors,
    });
  }
  next();
};

postsRouter.use(loggerMiddleware);

postsRouter.get("/", async (_, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: error.message });
  }
});

postsRouter.post("/", validateInputMiddleware, async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await createPost(nombre, descripcion);

    if (!result) {
      return res.status(500).json({ error: "Failed to create post" });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

postsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePostById(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default postsRouter;
