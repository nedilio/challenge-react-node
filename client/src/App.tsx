import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Form from "@/components/Form";
import PostsTable from "@/components/PostsTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/state/store";
import { fetchPostsAsync } from "@/state/posts/postsSlice";
import { Toaster } from "@/components/ui/sonner";
import { Card, CardContent, CardHeader } from "./components/ui/card";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);

  const [filter, setFilter] = useState<string>("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.nombre.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, posts]);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  return (
    <>
      <main className="flex flex-col justify-center gap-4 items-center min-h-screen px-4 py-8">
        <div className="container flex flex-col justify-center gap-4 items-center">
          <Card>
            <CardHeader>Filtrar Posts por nombre</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Label> Nombre </Label>
                <Input onChange={handleFilter}></Input>
              </div>
            </CardContent>
          </Card>
          <PostsTable posts={filteredPosts} loading={loading} />
          <Form />
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
