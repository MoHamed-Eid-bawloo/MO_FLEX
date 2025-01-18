import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { black } from "../assets";
import { useTmdbAPI } from "../Store/API";
import Loader from "./Loader";

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState({});
  const { tembApi } = useTmdbAPI();

  useEffect(() => {
    const fetchMovieCast = async () => {
      setLoading(true);
      try {
        const data = await tembApi.getMovieCast(movieId);
        if (data && data.cast) {
          setCast(data.cast);
        }
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
      setLoading(false);
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  if (loading) {
    return <Loader/>;
  }

  if (!cast.length) {
    return <p className="text-white">No cast available.</p>;
  }

  return (
    <div className="w-full flex items-center justify-start space-x-3 py-4 overflow-x-scroll horizontal-scrollbar">
      {cast.slice(0, 15).map((credit) => (
        <Link key={credit.id} to={`/actorInfo/${credit.id}`}>
          <div className="flex-none w-[150px] p-[6px] rounded-lg bg-secondaryGray">
            <div className="w-full h-1/2">
              <img
                src={
                  imgLoading[credit.id] || !credit.profile_path
                    ? black
                    : `https://image.tmdb.org/t/p/original${credit.profile_path}`
                }
                className="w-full h-[207px] rounded-lg mb-2"
                onLoad={() =>
                  setImgLoading((prev) => ({ ...prev, [credit.id]: false }))
                }
                onError={() =>
                  setImgLoading((prev) => ({ ...prev, [credit.id]: true }))
                }
                alt={credit.original_name}
              />
            </div>
            <h1 className="text-white font-semibold text-xl truncate">
              {credit.original_name}
            </h1>
            <p className="text-lightGray2 font-medium truncate">
              {credit.character}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
