import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTmdbAPI } from "../Store/API";
import Loader from "../Components/Loader";
import MovieCard from "../Components/MovieCard";

const SearchedMovieIndex = () => {
  const [movieSearchTerm] = useOutletContext();
  const { tembApi } = useTmdbAPI();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchSearchedMovie = async () => {
      setLoading(true);
      const data = await tembApi.getSearchedMovie(movieSearchTerm);
      if (data && data.results) {
        setMovies(data.results);
      }
      setLoading(false);
    };

    fetchSearchedMovie();
  }, [movieSearchTerm]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full px-5 py-7">
      <div className="w-full">
        <div className="w-full flex items-center justify-start mb-4">
          <h1 className="text-white font-bold text-2xl">
            Search results for {`"${movieSearchTerm}"`}
          </h1>
        </div>
        <div className="w-full flex justify-center items-center gap-2 flex-wrap">
          {loading ? (
            <Loader />
          ) : (
            movies?.map((movie) => {
              if (movie.backdrop_path)
                return (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    releaseDate={movie.release_date}
                    movieName={movie.original_title}
                    backdropPath={movie.backdrop_path}
                  />
                );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedMovieIndex;
