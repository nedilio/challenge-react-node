import * as z from "zod";

export const postSchema = z.object({
  nombre: z.string().min(5, "Nombre debe terner por lo menos 5 caracteres"),
  descripcion: z
    .string()
    .min(15, "Descripcion debe tener por lo menos 15 caracteres"),
});

export const validatePost = (data) => {
  return postSchema.safeParse(data);
};
