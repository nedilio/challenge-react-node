import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { Post } from "@/types/types";
import { getAllPosts } from "@/lib/data";

import Form from "@/components/Form";
import PostsTable from "@/components/PostsTable";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("");
  useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.nombre.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, posts]);

  return (
    <main className="flex flex-col justify-center gap-4 items-center min-h-screen">
      <div>
        <Label> Nombre </Label>
        <Input onChange={handleFilter}></Input>
      </div>
      <PostsTable posts={filteredPosts} />
      <Form />
    </main>
  );
}

export default App;
