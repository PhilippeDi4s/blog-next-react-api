import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, boolean, varchar } from "drizzle-orm/pg-core"

export const postsTable = pgTable("posts", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  excerpt: varchar("excerpt").notNull(),
  content: varchar("content").notNull(),
  coverImageUrl: varchar("cover_image_url").notNull(),
  published: boolean("published").notNull(),
  createdAt: varchar("created_at").notNull(),
  updatedAt: varchar("updated_at").notNull(),
  author: varchar("author").notNull(),
});

export type PostsTableSelectedMode = InferSelectModel<typeof postsTable>;
export type PostsTableInsert = InferInsertModel<typeof postsTable>;
