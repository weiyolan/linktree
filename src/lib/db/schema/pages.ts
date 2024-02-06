import { varchar, boolean, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getPages } from "@/lib/api/pages/queries";

import { nanoid } from "@/lib/utils";

export const pages = mysqlTable("pages", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  public: boolean("public").notNull().default(false),
  slug: varchar("slug", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for pages - used to validate API requests
const baseSchema = createSelectSchema(pages);

export const insertPageSchema = createInsertSchema(pages);
export const insertPageParams = baseSchema
  .extend({
    public: z.coerce.boolean(),
    slug: z.string().min(3),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePageSchema = baseSchema;
export const updatePageParams = baseSchema
  .extend({
    public: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const pageIdSchema = baseSchema.pick({ id: true });

// Types for pages - used to type API request params and within Components
export type Page = typeof pages.$inferSelect;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];

// this type infers the return from getPages() - meaning it will include any joins
export type CompletePage = Awaited<ReturnType<typeof getPages>>["pages"][number];
