import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { black } from "../assets";
import { useState } from "react";

const MovieCard = ({ movieId, movieName, releaseDate, backdropPath }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <Link to={`/movieInfo/${movieId}`}>
      <div
        className={`flex-auto h-[200px] max-w-[300px] relative scale-90 hover:scale-100 p-2 border-2 border-mainorange rounded-xl transition`}
      >
        {
          <img
            src={
              imgLoading
                ? black
                : `https://image.tmdb.org/t/p/original${backdropPath}`
            }
            className="w-[300px] h-full rounded-xl"
            onLoad={() => {
              setImgLoading(false);
            }}
          />
        }
        <div className="absolute left-0 bottom-0 w-full rounded-b-lg flex justify-between items-center px-3 py-2 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-full bg-mainorange">
              <BsInfoCircle className="text-white text-md font-bold" />
            </span>
            <div className="">
              <h1 className="text-white font-bold leading-3">
                {movieName.length > 15
                  ? movieName.substring(0, 15) + "..."
                  : movieName}
              </h1>
              <span className="text-lightGray2 text-sm font-semibold">
                {releaseDate}
              </span>
            </div>
          </div>
          <div className="font-bold text-black text-[12px] bg-white rounded-full px-3 py-1">
            view
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
