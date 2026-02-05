import { pool } from "./pool.js";

await pool.query(
  `INSERT INTO posts (nombre, descripcion)
   VALUES ($1, $2)`,
  ["Primer Post", "Descripcion primer post"],
);
await pool.query(
  `INSERT INTO posts (nombre, descripcion)
   VALUES ($1, $2)`,
  ["Segundo Post", "Descripcion segundo post"],
);

console.log("Seed inserted");
process.exit();
