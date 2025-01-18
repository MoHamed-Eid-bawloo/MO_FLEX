import React, { useState, useEffect, Suspense, lazy } from "react";
import { useTmdbAPI } from "../Store/API";
import MovieCardFallback from "../Components/MovieCardFallback";
import Loader from "../Components/Loader";
export default function Favs() {
  const [loading, setLoading] = useState(false);
  const { userData } = useTmdbAPI();
  const [userReactions, setUserReactions] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const MovieCard = lazy(() => import("../Components/MovieCard"));
  const backendURL ="https://mo-flex-mohamed-eids-projects-a6eeb72b.vercel.app"

  useEffect(() => {
    const getUserReactions = async () => {
      try {
        const response = await fetch(
          `${backendURL}/api/user/getfavoritesandwatchlist/${userData._id}`,
          {
            credentials: "include",
          }
        );
        const userReactions = await response.json();
        setUserReactions(userReactions);
      } catch (err) {
        console.log(err);
      }
    };

    getUserReactions();
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      userReactions?.favoriteMovies?.forEach(async (movieId) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTFlZjU2MzE3OWQ2OTM5ZTA3ZWYxOTAxYWVjODIwNCIsInN1YiI6IjYzZDEwMjcxY2I3MWI4MDA4NWRkMWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFORMLkhBq4MYqs5R8HP3kUbrj17SEQtafg5ecl3FAs",
            },
          }
        );

        const movieDetail = await response.json();
        const ifExist = favoriteMovies.find(
          (movie) => movie.id == movieDetail.id
        );

        if (ifExist == undefined) {
          setFavoriteMovies([...favoriteMovies, movieDetail]);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [userReactions, favoriteMovies]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-start my-5">
        <h1 className="text-white font-bold text-2xl">Your Favourite Movies</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-3">
        {favoriteMovies?.map((movie, i) => {
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
