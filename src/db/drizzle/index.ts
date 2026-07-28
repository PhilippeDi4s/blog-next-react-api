import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { postsTable } from "./schemas";

const sql = neon(process.env.DATABASE_URL!);

export const drizzleDb = drizzle(sql, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});