import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./itemcard.css";
import { useState } from "react";
import { fetchGQL } from "../../service";

export function ItemCard({
    item,
    className,
    mediaType
}){
    const [favourites, setFavourites] = useState(item.favourites);
    const isPerson = item.media_type == "person" || mediaType == "person";
    return <Link to={`/${item.media_type || mediaType}/${item.id}`} className={`itemcard ${className || ""}`}>
        {item.poster_path && <img src={item.poster.medium} alt={`${item.name || item.title} Poster`} loading="lazy" />}
        {isPerson && <img src={item.profile.medium} alt={`${item.name || item.title} Photo`} loading="lazy" />}
        <div className="content glass-background" style={{ paddingLeft: !item.profile_path ? "50px" : "" }}>
            {!isPerson && <span className="material-symbols-outlined material-symbols-filled play">play_circle</span>}
            <span className="title">{item.name || item.title}</span>
            {item.release_date && <span className="year">{dayjs(item.release_date).format("YYYY")}</span>}
            {item.first_air_date && <span className="year">{dayjs(item.first_air_date).format("YYYY")}-</span>}
            {item.character && <span className="year">{item.character}</span>}
            {item.job && <span className="year">{item.job}</span>}
        </div>
        <div className={`fav ${item.is_favourite ? "active" : ""}`}>
            <button onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if(item.is_favourite){
                    fetchGQL(`{
                        unFavourite(mediaId: "${item.id}", userId: "${localStorage.getItem("tmdb.userId")}") {
                          document
                        }
                      }`).then(resp => {
                        item.is_favourite = false;
                          setFavourites(favourites - 1);
                      });
                }
                else{
                    fetchGQL(`{
                        setFavourite(mediaId: "${item.id}", userId: "${localStorage.getItem("tmdb.userId")}") {
                          document
                        }
                      }`).then(resp => {
                        item.is_favourite = true;
                          setFavourites(favourites + 1);
                      });
                }
                
            }}>
                <span className="material-symbols-outlined heart">favorite</span>
                {!!favourites && <span className="count">{favourites}</span>}
            </button>
        </div>
    </Link>
}