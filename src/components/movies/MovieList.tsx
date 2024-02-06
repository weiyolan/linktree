"use client";
import { CompleteMovie } from "@/lib/db/schema/movies";
import { trpc } from "@/lib/trpc/client";
import MovieModal from "./MovieModal";


export default function MovieList({ movies }: { movies: CompleteMovie[] }) {
  const { data: m } = trpc.movies.getMovies.useQuery(undefined, {
    initialData: { movies },
    refetchOnMount: false,
  });

  if (m.movies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

const Movie = ({ movie }: { movie: CompleteMovie }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{movie.title}</div>
      </div>
      <MovieModal movie={movie} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No movies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new movie.
      </p>
      <div className="mt-6">
        <MovieModal emptyState={true} />
      </div>
    </div>
  );
};

