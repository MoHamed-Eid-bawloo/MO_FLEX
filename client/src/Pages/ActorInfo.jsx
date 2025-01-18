import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { black } from "../assets";
import Loader from "../Components/Loader";
import { useTmdbAPI } from "../Store/API";
const ActorCredits = () => {
  const { actorId } = useParams();
  const {tembApi} = useTmdbAPI();
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState();
  useEffect(() => {
    const fetchgetActorCredits = async () => {
      setLoading(true);
      const data = await tembApi.getActorCredits(actorId);
      if (data && data.cast) {
        setMovies(data.cast);
      }
      setLoading(false);
    };

    fetchgetActorCredits();
  }, [actorId]);
  const [imgLoading, setImgLoading] = useState(true);
  if (loading) {
    <Loader />;
  }

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-1">
      {movies?.map((movie) => {
        return (
          <Link key={movie?.id} to={`/movieInfo/${movie?.id}`}>
            <div className="flex-none w-[200px] flex flex-col justify-center items-center space-y-1">
              <img
                src={
                  imgLoading
                    ? black
                    : `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                }
                className="w-full h-[300px] rounded-lg"
                onLoad={() => {
                  setImgLoading(false);
                }}
                alt=""
              />
              <div className="text-lightGray2 font-medium text-sm">
                {movie?.original_title}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const ActorInfo = () => {
  const { actorId } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const {tembApi} = useTmdbAPI();

  useEffect(() => {
    const fetchgetActorDetail = async () => {
      setLoading(true);
      const data = await tembApi.getActorDetail(actorId);
      if (data && data) {
        setData(data);
      }
      setLoading(false);
    };

    fetchgetActorDetail();
  }, [actorId]);
  const [imgLoading, setImgLoading] = useState(true);
  if (loading) {
     return <Loader />;
  }
  const currentYear = new Date();

  return (
    <div className="w-full flex flex-col md:flex-row items-start space-x-4 py-4">
      <div className="w-full md:w-3/12 h-auto flex flex-col justify-center items-center space-x-3 ss:flex-row md:space-x-0 md:flex-col">
        <img
          src={
            imgLoading
              ? black
              : `https://image.tmdb.org/t/p/original${data?.profile_path}`
          }
          alt=""
          className="rounded-lg shadow-lg shadow-black/50 mb-3 w-[300px] flex-1"
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <div className="w-full text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h1 className="text-white font-semibold text-2xl mb-4">
            Personal Info
          </h1>
          <div className="w-full  flex flex-col justify-center items-center space-y-3 md:justify-start md:items-start">
            <div className="">
              <h1 className="text-white font-semibold text-xl">Department</h1>
              <p className="text-lightGray2 font-medium">
                {data?.known_for_department}
              </p>
            </div>
            <div className="">
              <h1 className="text-white font-semibold text-xl">Gender</h1>
              <p className="text-lightGray2 font-medium">
                {data?.gender == 1 ? "female" : "male"}
              </p>
            </div>
            <div className="">
              <h1 className="text-white font-semibold text-xl">Birthday</h1>
              <p className="text-lightGray2 font-medium">
                {data?.birthday
                  ? data?.birthday +
                    ` (${
                      currentYear.getFullYear() -
                      data?.birthday.split("-")[0] +
                      " years old"
                    })`
                  : "Not provided"}
              </p>
            </div>
            <div className="">
              <h1 className="text-white font-semibold text-xl">
                Place of Birth
              </h1>
              <p className="text-lightGray2 font-medium">
                {data?.place_of_birth ? data?.place_of_birth : "Not provided"}
              </p>
            </div>
            <div className="">
              <h1 className="text-white font-semibold text-xl">Also know As</h1>
              <p className="text-lightGray2 font-medium">
                {data?.also_known_as?.map((item) => (
                  <span key={item}>{item}, </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <h1 className="text-white font-bold text-3xl mb-5">{data?.name}</h1>
        <div className="">
          <h1 className="text-white font-bold text-2xl mb-3">Biography</h1>
          <div className="w-full flex flex-col space-x-4">
            <div className="">
              <p className="text-lightGray2">{data?.biography}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-bold text-white mb-4 text-2xl">Known for</h1>
              <div className="w-full flex justify-center items-center">
                <ActorCredits />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorInfo;
