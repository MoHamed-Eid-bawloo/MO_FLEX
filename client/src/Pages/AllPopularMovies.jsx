import React, { useState, useEffect, Suspense, lazy } from "react";
import { black } from "../assets";
import { useTmdbAPI } from "../Store/API";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import MovieCardFallback from "../Components/MovieCardFallback";
import Loader from "../Components/Loader";
export default function AllPopularMovies() {
  const [loading, setLoading] = useState(false);
  const { tembApi } = useTmdbAPI();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      const data = await tembApi.getPopularMovies();
      if (data && data.results) {
        setMovies(data.results);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);
  if (loading) {
    return <Loader/>
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-start my-5">
        <h1 className="text-white font-bold text-2xl">More Popular Movies</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-3">
        {movies?.map((movie, i) => {
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
  );
}
