import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "..";
import { useMovie } from "../../hooks";
import dayjs from "dayjs";
import "./movie.css";
import { runtimeString, } from "../../utils";
import { Grid } from "../../components/grid";
import { ItemCard } from "../../components/itemcard";
import { fetchGQL } from "../../service";

export function Movie(props){
    const params = useParams();
    const { loading, movie } = useMovie(params.movieId);
    const [favourites, setFavourites] = useState(0);
    useEffect(() => {
        if(movie){
            setFavourites(movie.favourites.count);
        }
    }, [movie])
    return <Page>
        {!loading && movie && <div className="movie">
            <div className="banner" style={{ backgroundImage: `url(${movie.images.backdrops[0].file.large})` }}>
                <div className="overlay" />
                <div className="content">
                    <div className="poster">
                        <img src={movie.images.posters[0].file.medium} alt="Poster"/>
                        <div className={`fav ${movie.is_favourite ? "active" : ""}`}>
                            <button onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                if(!movie.is_favourite){
                                    fetchGQL(`{
                                        favourite(mediaId: "${movie.id}", userId: "${localStorage.getItem("tmdb.userId")}") {
                                            count
                                        }
                                    }`).then(resp => {
                                        movie.is_favourite = true;
                                        setFavourites(resp.data.favourite.count);
                                    });
                                }
                                else{
                                    fetchGQL(`{
                                        unfavourite(mediaId: "${movie.id}", userId: "${localStorage.getItem("tmdb.userId")}") {
                                            count
                                        }
                                    }`).then(resp => {
                                        movie.is_favourite = false;
                                        setFavourites(resp.data.unfavourite.count);
                                    });
                                }
                                
                            }}>
                                <span className="material-symbols-outlined heart">favorite</span>
                                {!!favourites && <span className="count">{favourites}</span>}
                            </button>
                        </div>
                    </div>
                    <div className="details">
                        <h1 className="txt-heading-1">{movie.name || movie.title} ({movie.release_date && <span className="year">{dayjs(movie.release_date).format("YYYY")}</span>}
            {movie.first_air_date && <span className="year">{dayjs(movie.first_air_date).format("YYYY")}-</span>})</h1>
                        <div>
                            <span>{movie.release_date && <span className="year">{dayjs(movie.release_date).format("MM/DD/YYYY")}</span>}
                            {movie.first_air_date && <span className="year">{dayjs(movie.first_air_date).format("MM/DD/YYYY")}-</span>}</span>
                            &nbsp;&nbsp;•&nbsp;&nbsp;
                            <span>{movie.genres.map(genre => genre.name).join(", ")}</span>
                            &nbsp;&nbsp;•&nbsp;&nbsp;
                            <span>{runtimeString(movie.runtime)}</span>
                        </div>
                        <br />
                        <span>{movie.tagline}</span>
                        <h2>Overview</h2>
                        <span>{movie.overview}</span>
                    </div>
                </div>
            </div>
            <div className="cast">
                <h2>Cast</h2>
                <div className="horizontal">
                    {movie.credits.cast.map(actor => {
                        return <ItemCard item={actor} className="actor" mediaType={"person"} />
                    })}
                </div>
            </div>
            <div className="crew">
                <h2>Crew</h2>
                <div className="horizontal">
                    {movie.credits.crew.map(person => {
                        return <ItemCard item={person} className="person" mediaType={"person"} />
                    })}
                </div>
            </div>
            <div className="similar">
                <h2>Similar Movies</h2>
                <div className="horizontal">
                    {movie.similar.map(movie => {
                        return <ItemCard item={movie} className="movie" mediaType={"movie"} />
                    })}
                </div>
            </div>
        </div>}
    </Page>;
}