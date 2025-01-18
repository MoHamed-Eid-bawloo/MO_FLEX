import { lazy, useEffect, useState } from "react";
import { useTmdbAPI } from "../Store/API";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
const ActorView = lazy(() => import("../components/ActorView"));

const SearchedActor = () => {
  const [loading, setLoading] = useState(false);
  const { tembApi } = useTmdbAPI();
  const [acotrs, setActors] = useState();
  const {searchTerm} = useParams();
  useEffect(() => {
    const getActors = async () => {
      setLoading(true);
      const data = await tembApi.getSearchedActor(searchTerm);
      console.log(data);
      if (data && data.results) {
        setActors(data.results);
      }
      setLoading(false);
    };

    getActors();
  }, [searchTerm]);

  if (loading) return <Loader />;
  return (
    <div className="w-full px-5 py-7">
      <div className="w-full">
        <div className="w-full flex items-center justify-start mb-4">
          <h1 className="text-white font-bold text-2xl">
            Search results for {`"${searchTerm}"`}
          </h1>
        </div>
        <div className="w-full flex justify-center items-center gap-2 flex-wrap">
          {acotrs?.map((actor) => {
            if (actor.profile_path)
              return (
                <ActorView
                  key={actor.id}
                  actorId={actor.id}
                  name={actor.name}
                  profilePath={actor.profile_path}
                  knownfor={actor.known_for}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchedActor;
