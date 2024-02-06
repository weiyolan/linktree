import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MovieId, movieIdSchema, movies } from "@/lib/db/schema/movies";

export const getMovies = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(movies).where(eq(movies.userId, session?.user.id!));
  const m = rows
  return { movies: m };
};

export const getMovieById = async (id: MovieId) => {
  const { session } = await getUserAuth();
  const { id: movieId } = movieIdSchema.parse({ id });
  const [row] = await db.select().from(movies).where(and(eq(movies.id, movieId), eq(movies.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { movie: m };
};


