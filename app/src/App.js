import { Routes, Route, Link } from "react-router-dom";
import { GENRES } from "./constants";
import "./App.css";
import { Home } from "./pages/home";
import dayjs from "dayjs";
import { useTrending, useNowPlaying, useQuery } from "./hooks";
import { Movie } from "./pages/movie";
import { Popular } from "./pages/popular";
import { TopRated } from "./pages/toprated";
import { ByGenre } from "./pages/genres";
import { ItemCard } from "./components/itemcard";
import { LinkWithQuery } from "./utils";

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
                <LinkWithQuery to={"/"} className={window.location.pathname == "/" ? "active" : ""}>
                  <span className="material-symbols-outlined">home</span> Home
                </LinkWithQuery>
              </li>
              <li>
                <LinkWithQuery to={"/popular"} className={window.location.pathname == "/popular" ? "active" : ""}>
                  <span className="material-symbols-outlined">update</span>{" "}
                  Popular
                </LinkWithQuery>
              </li>
              <li>
                <Link to={"/top-rated"} className={window.location.pathname == "/top-rated" ? "active" : ""}>
                  <span className="material-symbols-outlined">star</span> Top
                  Rated
                </Link>
              </li>
              {/* <li>
                <Link to={"/discover"}>
                  <span className="material-symbols-outlined">
                    travel_explore
                  </span>{" "}
                  Discover
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="menusection">
            <span className="title txt-bold">POPULAR GENRES</span>
            <div className="genres">
              {GENRES.map((genre, i) => <Link to={`/genre/${genre.id}`} className={`genretag`} style={{ backgroundColor: `var(--accent-color-${(i % 4) + 1})` }}>{genre.name}</Link>)}
            </div>
          </div>
        </nav>
        <section className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/genre/:genreId" element={<ByGenre />} />
            <Route path="/movie/:movieId" element={<Movie />} />
          </Routes>
        </section>
        <section className="sidebar">
          <span className="title txt-heading-2">Now Playing</span>
          <ul>
          {nowPlaying.map(item => {
            return <li key={item.id}>
              <ItemCard item={item} />
            </li>
          })}
          </ul>
        </section>
      </div>
  );
}

export default App;
