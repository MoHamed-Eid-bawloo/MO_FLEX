import { useState } from "react";
import { Link } from "react-router-dom";
import { black } from "../assets";

const ActorView = ({ actorId, name, profilePath, knownfor}) => {
    const [imgLoading, setImgLoading] = useState(true);

    return (
        <Link to={`/actorInfo/${actorId}`}>
            <div className="flex-auto max-w-[250px] bg-secondaryGray rounded-lg p-3">
                <img 
                    src={imgLoading ? black : `https://image.tmdb.org/t/p/original${profilePath}`} 
                    className="rounded-lg"
                    onLoad={() => {
                        setImgLoading(false);
                    }}
                    alt="" 
                />
                <h1 className="text-white font-bold text-xl">{name}</h1>
                <p className="text-lightGray2 truncate">{knownfor.map(value => value.original_title ? value.original_title + "," : value.original_name + ",")}</p>
            </div>
        </Link>
    )
}

export default ActorView;