import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { useTmdbAPI } from "../Store/API";
import MovieCardFallback from "../Components/MovieCardFallback";

const MovieCard = lazy(() => import("../Components/MovieCard"));

const GenreMovies = () => {
  const { genreId, genreName } = useParams();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const { tembApi } = useTmdbAPI();

  useEffect(() => {
    const fetchMovieByGenre = async () => {
      setLoading(true);
      const data = await tembApi.getMovieByGenre(genreId);
      if (data && data.results) {
        setMovies(data.results);
      }
      setLoading(false);
    };

    fetchMovieByGenre();
  }, [genreId, genreName]);
  if (loading) {
    return <Loader/>
  }
  return (
    <div className="w-full px-5 py-7">
      <div className="w-full">
        <div className="w-full flex items-center justify-start mb-4">
          <h1 className="text-white font-bold text-2xl">
            {`${genreName}`} Movies
          </h1>
        </div>
        <div className="w-full flex justify-center items-center gap-2 flex-wrap">
          {movies?.map((movie) => {
            if (movie.backdrop_path)
              return (
                <Suspense key={movie.id} fallback={<MovieCardFallback />}>
                  <MovieCard
                    movieId={movie.id}
                    releaseDate={movie.release_date}
                    movieName={movie.original_title}
                    backdropPath={movie.backdrop_path}
                  />
                </Suspense>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenreMovies;
