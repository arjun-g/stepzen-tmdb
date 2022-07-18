import { Routes, Route, Link } from "react-router-dom";
import { GENRES } from "./constants";
import "./App.css";
import { Home } from "./pages/home";
import dayjs from "dayjs";
import { useTrending, useNowPlaying, useQuery } from "./hooks";
import { Movie } from "./pages/movie";

function App() {
  const nowPlaying = useNowPlaying();
  const query = useQuery();
  return (
      <div className="App">
        <nav className="leftnav">
          <div className="logo"></div>
          <div className="menusection">
            <span className="title txt-bold">MENU</span>
            <ul>
              <li>
                <Link to={"/"} className="active">
                  <span className="material-symbols-outlined">home</span> Home
                </Link>
              </li>
              <li>
                <Link to={"/trending"}>
                  <span className="material-symbols-outlined">trending_up</span>{" "}
                  Trending
                </Link>
              </li>
              <li>
                <Link to={"/upcoming"}>
                  <span className="material-symbols-outlined">update</span>{" "}
                  Upcoming
                </Link>
              </li>
              <li>
                <Link to={"/top-rated"}>
                  <span className="material-symbols-outlined">star</span> Top
                  Rated
                </Link>
              </li>
              <li>
                <Link to={"/discover"}>
                  <span className="material-symbols-outlined">
                    travel_explore
                  </span>{" "}
                  Discover
                </Link>
              </li>
            </ul>
          </div>

          <div className="menusection">
            <span className="title txt-bold">POPULAR GENRES</span>
            <div className="genres">
              {GENRES.map((genre, i) => <Link to={genre.id} className={`genretag`} style={{ backgroundColor: `var(--accent-color-${(i % 4) + 1})` }}>{genre.name}</Link>)}
            </div>
          </div>
        </nav>
        <section className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
          </Routes>
        </section>
        <section className="sidebar">
          <span className="title txt-heading-2">Now Playing</span>
          <ul>
          {nowPlaying.map(item => {
            return <li key={item.id}>
              <Link to={`/movie/${item.id}`}>
                  <img src={item.poster.small} alt={`${item.name || item.title} Poster`} loading="lazy" />
                  <div className="caption">
                    <span className="title txt-bold">{item.name || item.title}</span>
                    {(!query.media || query.media === "movie") && <span className="release">Released On {dayjs(item.release_date).format("DD MMMM")}</span>}
                  </div>
              </Link>
            </li>
          })}
          </ul>
        </section>
      </div>
  );
}

export default App;
