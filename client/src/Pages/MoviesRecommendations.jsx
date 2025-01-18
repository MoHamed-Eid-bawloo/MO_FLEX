import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { black } from "../assets";
import { useTmdbAPI } from "../Store/API";
import Loader from "../Components/Loader";

export default function MovieRecommendations({ movieId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState({});
  const { tembApi } = useTmdbAPI();

  useEffect(() => {
    const MovieRecommendations = async () => {
      setLoading(true);
      try {
        const data = await tembApi.getMovieRecommendations(movieId);
        if (data && data.results) {
          setRecommendations(data.results); 
        }
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
      setLoading(false);
    };

    if (movieId) {
      MovieRecommendations();
    }
  }, [movieId]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="flex items-center justify-start space-x-3  py-4 overflow-x-scroll horizontal-scrollbar">
        {
            recommendations.slice(0, 12).map(movie => {
                if (movie.backdrop_path) return (
                    <Link 
                        key={movie.id} to={`/movieInfo/${movie.id}`}                        
                    >
                        <div className="flex-none w-[300px] h-[230px]">
                            <div className="w-full h-4/5">
                                <img 
                                    src={imgLoading ? black : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                                    alt="" 
                                    className="w-full h-full rounded-xl"
                                    onLoad={() => {
                                        setImgLoading(false);
                                    }}                                    
                                />
                            </div>
                            <div className="w-full flex justify-between items-center mt-2">
                                <h1 className="text-white font-semibold truncate">{movie.original_title}</h1>
                                <p className="text-lightGray2 font-medium text-sm">{movie.release_date.split("-")[0]}</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}
