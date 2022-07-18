import { useParams } from "react-router-dom";
import { Page } from "..";
import { useMovie } from "../../hooks";
import dayjs from "dayjs";
import "./movie.css";

export function Movie(props){
    const params = useParams();
    const { loading, movie } = useMovie(params.movieId);
    return <Page>
        {!loading && movie && <div className="movie">
            <div className="banner" style={{ backgroundImage: `url(${movie.images.backdrops[0].file.large})` }}>
                <div className="overlay" />
                <div className="content">
                    <div className="poster">
                        <img src={movie.images.posters[0].file.medium} />
                    </div>
                    <div className="details">
                        <h1>{movie.name || movie.title} ({movie.release_date && <span className="year">{dayjs(movie.release_date).format("YYYY")}</span>}
            {movie.first_air_date && <span className="year">{dayjs(movie.first_air_date).format("YYYY")}-</span>})</h1>
                        <span>{movie.release_date && <span className="year">{dayjs(movie.release_date).format("MM/DD/YYYY")}</span>}
            {movie.first_air_date && <span className="year">{dayjs(movie.first_air_date).format("MM/DD/YYYY")}-</span>}</span>
                    </div>
                </div>
            </div>
        </div>}
    </Page>;
}