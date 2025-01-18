import React, { lazy, Suspense, useEffect, useState } from "react";
import { useTmdbAPI } from "../Store/API";
import { Link } from "react-router-dom";
import MovieCardFallback from "../Components/MovieCardFallback";
import MovieCard from "../Components/MovieCard";
import Loader from "../Components/Loader";
export default function UpcomingMovies() {
  const { tembApi } = useTmdbAPI();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setLoading(true);
      const data = await tembApi.getUpCommingMovies();
      if (data && data.results) {
        setMovies(data.results);
      }
      setLoading(false);
    };

    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return <Loader title={"Loading Movies..."} />;
  }

  return (
    <div className="flex-1">
      <div className="w-full flex justify-between items-center py-3 px-2">
        <div className="flex items-center justify-center">
          <h1 className="text-xl text-white font-bold flex md:text-2xl">
            Upcoming <span className="hidden ml-1 ss:block">Movies</span>
          </h1>
          <div className="w-[1px] h-[20px] bg-lightGray2 mx-2"></div>
          <span className="text-md text-lightGray2">trailers</span>
        </div>
      </div>
      <div className=" flex flex-wrap justify-center">
        {movies.map((movie) => {
          return (
            <Suspense key={movie.id} fallback={<MovieCardFallback />}>
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                movieName={movie.original_title}
                releaseDate={movie.release_date}
                backdropPath={movie.backdrop_path}
              />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}
