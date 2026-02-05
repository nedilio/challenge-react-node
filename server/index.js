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
// app.get("/posts", (req, res) => {
//   const posts = getAllPosts();
//   res.status(200).json(posts);
// });
// app.post("/posts", (req, res) => {
//   const { nombre, descripcion } = req.body;
//   console.log({ nombre, descripcion });
//   createPost(nombre, descripcion);

//   res
//     .status(201)
//     .json({ message: "Post created", post: { nombre, descripcion } });
// });
// app.delete("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   console.log({ id });
//   deletePostById(id);
//   res.status(200).json({ message: `Post with id ${id} deleted` });
// });

//use postsRouter for /posts route

app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
