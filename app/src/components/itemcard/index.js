import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./itemcard.css";

export function ItemCard({
    item
}){
    return <Link to={`/movie/${item.id}`} className="itemcard">
        <img src={item.poster.medium} alt={`${item.name || item.title} Poster`} />
        <div className="content glass-background">
            <span className="material-symbols-outlined material-symbols-filled play">play_circle</span>
            <span className="title">{item.name || item.title}</span>
            {item.release_date && <span className="year">{dayjs(item.release_date).format("YYYY")}</span>}
            {item.first_air_date && <span className="year">{dayjs(item.first_air_date).format("YYYY")}-</span>}
        </div>
    </Link>
}