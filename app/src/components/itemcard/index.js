import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./itemcard.css";

export function ItemCard({
    item,
    className,
    mediaType
}){
    return <Link to={`/${item.media_type || mediaType}/${item.id}`} className={`itemcard ${className || ""}`}>
        {item.poster_path && <img src={item.poster.medium} alt={`${item.name || item.title} Poster`} loading="lazy" />}
        {item.profile_path && <img src={item.profile.medium} alt={`${item.name || item.title} Photo`} loading="lazy" />}
        <div className="content glass-background" style={{ paddingLeft: !item.profile_path ? "50px" : "" }}>
            {!item.profile_path && <span className="material-symbols-outlined material-symbols-filled play">play_circle</span>}
            <span className="title">{item.name || item.title}</span>
            {item.release_date && <span className="year">{dayjs(item.release_date).format("YYYY")}</span>}
            {item.first_air_date && <span className="year">{dayjs(item.first_air_date).format("YYYY")}-</span>}
            {item.character && <span className="year">{item.character}</span>}
            {item.job && <span className="year">{item.job}</span>}
        </div>
    </Link>
}