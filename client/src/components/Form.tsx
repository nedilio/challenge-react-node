import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/data";
import { useState } from "react";
import type { Post } from "@/types/types";
import { useDispatch } from "react-redux";
import { create } from "@/state/posts/postsSlice";

function Form() {
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({
    nombre: "",
    descripcion: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;

    if (!nombre || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await createPost({ nombre, descripcion });
      dispatch(create({ nombre, descripcion }));
      setNewPost({ nombre: "", descripcion: "" });
      setError(null);
    } catch (error) {
      setError("Error al crear el post. Inténtalo de nuevo.");
      console.error("Error creating post:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>Agregar Nuevo Post</CardHeader>
        <CardContent>
          <div>{error && <p className="text-red-500 mb-2">{error}</p>}</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre">Nombre:</Label>
              <Input
                id="nombre"
                name="nombre"
                value={newPost.nombre}
                onChange={(e) => {
                  setNewPost({ ...newPost, nombre: e.target.value });
                }}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="descripcion">Descripcion:</Label>
              <Input
                name="descripcion"
                id="descripcion"
                value={newPost.descripcion}
                onChange={(e) => {
                  setNewPost({ ...newPost, descripcion: e.target.value });
                }}
              ></Input>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Agregar Post</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Form;
