import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { Post } from "@/types/types";
import { useDispatch } from "react-redux";
import { deletePostAsync } from "@/state/posts/postsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { AppDispatch } from "@/state/store";

const PostsTable = ({
  posts,
  loading,
}: {
  posts: Post[];
  loading: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeletePost = async (id: number) => {
    try {
      dispatch(deletePostAsync(id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  if (posts.length === 0 && !loading) {
    return <p>No hay posts disponibles.</p>;
  }
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Accion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-60" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))}
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.nombre}</TableCell>
                <TableCell className="min-w-xs">{post.descripcion}</TableCell>
                <TableCell>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default PostsTable;
