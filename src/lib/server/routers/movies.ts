import { getMovieById, getMovies } from "@/lib/api/movies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  movieIdSchema,
  insertMovieParams,
  updateMovieParams,
} from "@/lib/db/schema/movies";
import { createMovie, deleteMovie, updateMovie } from "@/lib/api/movies/mutations";

export const moviesRouter = router({
  getMovies: publicProcedure.query(async () => {
    return getMovies();
  }),
  getMovieById: publicProcedure.input(movieIdSchema).query(async ({ input }) => {
    return getMovieById(input.id);
  }),
  createMovie: publicProcedure
    .input(insertMovieParams)
    .mutation(async ({ input }) => {
      return createMovie(input);
    }),
  updateMovie: publicProcedure
    .input(updateMovieParams)
    .mutation(async ({ input }) => {
      return updateMovie(input.id, input);
    }),
  deleteMovie: publicProcedure
    .input(movieIdSchema)
    .mutation(async ({ input }) => {
      return deleteMovie(input.id);
    }),
});
