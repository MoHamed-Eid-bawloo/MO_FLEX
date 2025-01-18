import { lazy, Suspense, useEffect, useState } from "react";
import ActorViewFallback from "../Components/ActorViewFallBack";
import { useTmdbAPI } from "../Store/API";
const ActorView = lazy(() => import("../Components/ActorView"));

const AllActors = () => {
  const [loading, setLoading] = useState(false);
  const { tembApi } = useTmdbAPI();
  const [acotrs, setActors] = useState();

  useEffect(() => {
    const getActors = async () => {
      setLoading(true);
      const data = await tembApi.getActors();
      if (data && data.results) {
        setActors(data.results);
      }
      setLoading(false);
    };

    getActors();
  }, []);
  return (
    <div className="w-full px-5 py-7">
        <div className="w-full">
            <div className="w-full flex items-center justify-start mb-4">
                <h1 className="text-white font-bold text-2xl">Popular Actors</h1>
            </div>
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                {
                    acotrs?.map((actor) => {
                        return (
                            <Suspense key={actor.id} fallback={<ActorViewFallback />}>
                                <ActorView                                    
                                    actorId={actor.id}
                                    name={actor.name}
                                    profilePath={actor.profile_path}
                                    knownfor={actor.known_for}  
                                />
                            </Suspense>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default AllActors
