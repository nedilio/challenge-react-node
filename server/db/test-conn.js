import { pool } from "./pool.js";

const result = await pool.query("SELECT NOW()");
console.log("DB connected at:", result.rows[0].now);

process.exit();
