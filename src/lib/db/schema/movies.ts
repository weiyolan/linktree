import { varchar, boolean, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMovies } from "@/lib/api/movies/queries";

import { nanoid } from "@/lib/utils";

export const movies = mysqlTable("movies", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: varchar("title", { length: 256 }).notNull(),
  favorite: boolean("favorite").notNull().default(false),
  category: varchar("category", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for movies - used to validate API requests
const baseSchema = createSelectSchema(movies);

export const insertMovieSchema = createInsertSchema(movies);
export const insertMovieParams = baseSchema
  .extend({})
  .extend({
    favorite: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMovieSchema = baseSchema;
export const updateMovieParams = baseSchema
  .extend({
    favorite: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const movieIdSchema = baseSchema.pick({ id: true });

// Types for movies - used to type API request params and within Components
export type Movie = typeof movies.$inferSelect;
export type NewMovie = z.infer<typeof insertMovieSchema>;
export type NewMovieParams = z.infer<typeof insertMovieParams>;
export type UpdateMovieParams = z.infer<typeof updateMovieParams>;
export type MovieId = z.infer<typeof movieIdSchema>["id"];

// this type infers the return from getMovies() - meaning it will include any joins
export type CompleteMovie = Awaited<ReturnType<typeof getMovies>>["movies"][number];
