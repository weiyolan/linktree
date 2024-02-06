import MovieList from "@/components/movies/MovieList";
import NewMovieModal from "@/components/movies/MovieModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Movies() {
  await checkAuth();
  const { movies } = await api.movies.getMovies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Movies</h1>
        <NewMovieModal />
      </div>
      <MovieList movies={movies} />
    </main>
  );
}
