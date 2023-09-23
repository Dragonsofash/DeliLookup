import { config as dotenvConfig } from "dotenv";
import pg from "pg";

dotenvConfig();
const { Client } = pg;

const DB_NAME = "giant_deli";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

export default client;
