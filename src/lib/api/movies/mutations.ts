import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  MovieId, 
  NewMovieParams,
  UpdateMovieParams, 
  updateMovieSchema,
  insertMovieSchema, 
  movies,
  movieIdSchema 
} from "@/lib/db/schema/movies";
import { getUserAuth } from "@/lib/auth/utils";

export const createMovie = async (movie: NewMovieParams) => {
  const { session } = await getUserAuth();
  const newMovie = insertMovieSchema.parse({ ...movie, userId: session?.user.id! });
  try {
    await db.insert(movies).values(newMovie)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMovie = async (id: MovieId, movie: UpdateMovieParams) => {
  const { session } = await getUserAuth();
  const { id: movieId } = movieIdSchema.parse({ id });
  const newMovie = updateMovieSchema.parse({ ...movie, userId: session?.user.id! });
  try {
    await db
     .update(movies)
     .set({...newMovie, updatedAt: new Date() })
     .where(and(eq(movies.id, movieId!), eq(movies.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMovie = async (id: MovieId) => {
  const { session } = await getUserAuth();
  const { id: movieId } = movieIdSchema.parse({ id });
  try {
    await db.delete(movies).where(and(eq(movies.id, movieId!), eq(movies.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

