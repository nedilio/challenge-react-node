import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const path = join(".", "database.sqlite");

const database = new DatabaseSync(path);

const initializeDB = `
CREATE TABLE IF NOT EXISTS posts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT NOT NULL,
descripcion TEXT NOT NULL
);
`;

database.exec(initializeDB);

export default database;
