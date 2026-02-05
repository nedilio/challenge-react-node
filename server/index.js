import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createPost, deletePostById, getAllPosts } from "./db/queries.js";
import postsRouter from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
