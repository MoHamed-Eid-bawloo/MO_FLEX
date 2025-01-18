import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { FaHeart, FaBookmark, FaTimes } from "react-icons/fa";
import { black } from "../assets";
import Loader from "../Components/Loader";
import { useTmdbAPI } from "../Store/API";
import MovieCast from "../Components/MovieCast";
import axios from "axios";
import MovieRecommendations from "./MoviesRecommendations";

const MovieTrailer = ({ setShowTrailer }) => {
  const { movieId } = useParams();
  const [dataTrailer, setDataTrailer] = useState(null);
  const [loading,setLoading] = useState(null)
  const { tembApi } = useTmdbAPI();

   
  useEffect(() => {
    const fetchMovieTrailer = async () => {
      setLoading(true);
      const result = await tembApi.getMovieTrailer(movieId);
      if (result) {
        setDataTrailer(result);
      }
      setLoading(false);
    };
    fetchMovieTrailer();
  }, [movieId]);

  const trailerKey = dataTrailer?.results.length != 0 ? dataTrailer?.results?.find(trailer => trailer.site == "YouTube" && trailer.type == "Trailer").key : undefined;

  if (loading) return <Loader title="loading Trailer..." />

  return (
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gradient-to-r from-black/90 to-black/90 backdrop-blur-xl">
          {                
              <div className="w-full flex flex-col justify-center items-center ">
                  <FaTimes
                      className="p-1 text-black font-bold rounded-full text-3xl bg-white mb-3 cursor-pointer"
                      onClick={() => {
                          setShowTrailer(false);
                      }}
                  />
                  {
                      trailerKey ? (
                          <iframe src={`https://www.youtube.com/embed/${trailerKey}`} className="w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[700px] md:h-[500px]" ></iframe>
                      ) : (
                          <div className="text-white text-2xl mt-5">Trailer Not Found</div>
                      )
                  }
              </div>
          }
          
      </div>
  )
}

export default function MovieInfo() {
  const backendURL =
    import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { tembApi, userData } = useTmdbAPI();
  const [userReactions, setUserReactions] = useState({
    isMovieLiked: false,
    isPartOfWatchlist: false,
  });

  // Fetch Movie Details
  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      const result = await tembApi.getMovieDetail(movieId);
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    fetchMovieDetail();
  }, [movieId]);

  // Post Fav
  useEffect(() => {
    const favMovies =userData?.favoriteMovies&& JSON.parse(localStorage.getItem("favMovies")) || [];
    const partOfWatchlist =userData?.watchlist&& JSON.parse(localStorage.getItem("wahslistMovies")) || [];
    setUserReactions({
        isMovieLiked: favMovies.includes(movieId),
        isPartOfWatchlist: partOfWatchlist.includes(movieId),
      });
  }, [userReactions.isMovieLiked,userReactions.isPartOfWatchlist,movieId]);
  const AddFavourite = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/user/addtofavorites/${userData._id}/${movieId}`, {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
        if (!favMovies.includes(movieId)) {
          favMovies.push(movieId);
          localStorage.setItem("favMovies", JSON.stringify(favMovies));
        }
        setUserReactions({ isMovieLiked: true });
      }
      if (response.data.isLiked === false) {
        const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
        const updatedFavs = favMovies.filter((id)=> id != movieId)
        localStorage.setItem("favMovies", JSON.stringify(updatedFavs));
        setUserReactions({ isMovieLiked: false });
      }
      
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  
  const addToWatchlist = async () => {
    try {
      const response = await axios.post(
      `  ${backendURL}/api/user/addtowatchlist/${userData._id}/${movieId}`, {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        const partOfWatchlist = JSON.parse(localStorage.getItem("wahslistMovies")) || [];
        if (!partOfWatchlist.includes(movieId)) {
            partOfWatchlist.push(movieId);
          localStorage.setItem("wahslistMovies", JSON.stringify(partOfWatchlist));
        }
        setUserReactions({ isPartOfWatchlist: true });
      }
      if (response.data.partOfWatchlist === false) {
        const partOfWatchlist = JSON.parse(localStorage.getItem("wahslistMovies")) || [];
        const updatedpartOfWatchlist= partOfWatchlist.filter((id)=> id != movieId)
        localStorage.setItem("wahslistMovies", JSON.stringify(updatedpartOfWatchlist));
        setUserReactions({ isPartOfWatchlist: false });
      }
      
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };


  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="w-full pb-5 absolute top-0 left-0">
      {/* Background Image */}
      <div
        className={`bg-[url("https://image.tmdb.org/t/p/original${data?.backdrop_path}")] bg-cover bg-center w-full`}
      >
        <div className="bg-gradient-to-r from-black/60 to-black/60 z-10 w-full flex flex-col items-center space-y-4 py-10 px-3 md:space-x-4 md:space-y-0 md:px-8 md:flex-row">
          {/* Movie Poster */}
          <div className="max-w-[200px] md:max-w-[300px] h-auto">
            <img
              src={
                imgLoading
                  ? black
                  : `https://image.tmdb.org/t/p/original${data?.poster_path}`
              }
              alt={data?.original_title}
              className={`w-full ${
                imgLoading ? "h-[450px]" : "h-auto"
              } rounded-lg`}
              onLoad={() => setImgLoading(false)}
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-white">
              {data?.original_title}{" "}
              <span className="text-lightGray2">
                ({data?.release_date?.split("-")[0]})
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 text-white">
              <span>{data?.release_date}</span>
              {data?.production_countries.length > 0 && (
                <>
                  <span>({data?.production_countries[0]?.iso_3166_1})</span>
                  <div className="h-[4px] w-[4px] rounded-full bg-white"></div>
                </>
              )}
              <p>
                {data?.genres.map((genre, i) =>
                  i === data?.genres.length - 1 ? genre.name : `${genre.name}, `
                )}
              </p>
              <div className="h-[4px] w-[4px] rounded-full bg-white"></div>
              <span>{data?.runtime} min</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center md:justify-start space-x-3 my-4">
              <button
                className="flex items-center bg-mainorange px-3 py-1 rounded-lg text-white"
                onClick={() => setShowTrailer(true)}
              >
                <BsFillPlayFill /> Play Trailer
              </button>
              <button
                onClick={AddFavourite}
                className={`p-3 rounded-full bg-secondaryGray ${
                  userReactions.isMovieLiked ? "text-red-500" : "text-white"
                }`}
              >
                <FaHeart />
              </button>
              <button
                onClick={addToWatchlist}
                className={`p-3 rounded-full bg-secondaryGray ${
                  userReactions.isPartOfWatchlist
                    ? "text-green-700"
                    : "text-white"
                }`}
              >
                <FaBookmark />
              </button>
            </div>

            {/* Tagline */}
            {data?.tagline && (
              <p className="text-lightGray2 italic mb-3">"{data?.tagline}"</p>
            )}

            {/* Overview */}
            <div>
              <h2 className="font-bold text-xl text-white mb-2">Overview</h2>
              <p className="text-white text-sm md:text-base">
                {data?.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cast and Recommendations */}
      <div className="w-full px-2">
        <div className="flex items-start flex-col-reverse h-auto sm:flex-row">
          <div className="w-full sm:w-3/4 flex-1">
            {/* Movie Cast */}
            <div>
              <h2 className="text-white text-3xl">Cast</h2>
              <MovieCast movieId={movieId} />
            </div>

            {/* Movie Recommendations */}
            <div className="mt-10">
              <h2 className="text-white text-3xl mb-2">Recommendations</h2>
              <MovieRecommendations movieId={movieId} />
            </div>
          </div>
        </div>
      </div>

      {/* Movie Trailer Popup */}
      {showTrailer && (
        <MovieTrailer movieId={movieId} setShowTrailer={setShowTrailer} />
      )}
    </div>
  );
}
