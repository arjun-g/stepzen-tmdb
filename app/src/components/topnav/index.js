import { Link } from "react-router-dom";
import "./topnav.css";
import { usePath, useQuery } from "../../hooks";

export function TopNav(props){
    const query = useQuery();
    const path = usePath();
    return <div className="topnav">
        <ul>
            <li>
                <Link to={`${path}`} className={!query.media && "active"}>Movies</Link>
            </li>
            <li>
                <Link to={`${path}?media=tv`} className={query.media === "tv" && "active"}>TV</Link>
            </li>
            <li>
                <Link to={`${path}?media=actor`} className={query.media === "actor" && "active"}>Actor</Link>
            </li>
        </ul>
        <div className="search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search for movies, tv and/or actors" />
        </div>
    </div>
}