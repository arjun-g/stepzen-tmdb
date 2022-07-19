import { Link, Route, Routes } from "react-router-dom";
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
                {(window.location.pathname === "/" || window.location.pathname === "/popular") && <Link to={`${path}?media=person`} className={query.media === "person" && "active"}>Actors</Link>}
            </li>
        </ul>
        {/* <div className="search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search for movies, tv and/or actors" />
        </div> */}
    </div>
}