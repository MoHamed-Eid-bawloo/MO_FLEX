import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTmdbAPI } from "../Store/API";
import Loader from "../Components/Loader";

const GenreList = () => {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const { tembApi } = useTmdbAPI();

  useEffect(() => {
    const fetchGenreList = async () => {
      setLoading(true);
      const data = await tembApi.getGenreList();
      if (data && data.genres) {
        setGenres(data.genres);
      }
      setLoading(false);
    };

    fetchGenreList();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full py-4 px-3 flex flex-wrap items-center justify-center space-x-2 space-y-2">
      {genres.map((genre) => (
        <NavLink
          to={`/movieSearch/${genre.id}/${genre.name}`}
          key={genre.id}
          className={({ isActive }) =>
            `px-3 py-1 border border-lightGray1 rounded-full font-medium text-sm sm:px-4 sm:py-2 sm:text-[18px] ${
              isActive
                ? "text-black font-bold bg-mainorange border-2 border-black"
                : "text-white"
            }`
          }
        >
          {genre.name}
        </NavLink>
      ))}
    </div>
  );
};
const SearchedMovie = () => {
  const navigate = useNavigate();
  const [movieSearchTerm, setMovieSearchTerm] = useState("");

  return (
    <div className="w-full absolute top-0 left-0">
      <div className="w-full flex flex-col items-center justify-center py-5 border-b border-lightGray1">
        <div className="w-5/6 xs:w-2/3 flex items-center">
          <input
            onChange={(e) => {
              setMovieSearchTerm(e.target.value);
            }}
            onClick={() => {
              navigate("/movieSearch");
            }}
            className="flex-1 h-10 rounded-full bg-black/40 pl-3 text-mainorange outline-none border border-lightGray1"
            type="text"
            placeholder="search for movie"
          />
        </div>
        <GenreList />
      </div>

      <Outlet context={[movieSearchTerm]} />
    </div>
  );
};
export default SearchedMovie;
