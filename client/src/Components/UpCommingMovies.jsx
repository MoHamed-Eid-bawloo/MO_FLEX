import React, { lazy, Suspense, useEffect, useState } from "react";
import { useTmdbAPI } from "../Store/API";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import MovieCardFallback from "./MovieCardFallback";
import MovieCard from "./MovieCard";

export default function UpcomingMovies() {
  const { tembApi } = useTmdbAPI();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const MovieCard = lazy(() => import("./MovieCard"))

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
        <Link to="/allUpComMovies">
          <h1 className="text-sm text-lightGray2">All Upcoming Movies</h1>
        </Link>
      </div>
      <div className=" flex flex-wrap justify-center">
        {movies.slice(0, 5).map((movie) => {
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
