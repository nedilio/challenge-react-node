import { deletePost } from "@/lib/data";
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

const PostsTable = ({ posts }: { posts: Post[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.nombre}</TableCell>
            <TableCell>{post.descripcion}</TableCell>
            <TableCell>
              <Button
                variant={"destructive"}
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default PostsTable;
