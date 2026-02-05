import { pool } from "./pool.js";

const query = `
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

await pool.query(query);
console.log("Posts table ready");

process.exit();
