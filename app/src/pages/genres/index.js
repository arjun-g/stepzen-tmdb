import { useEffect } from "react";
import { Page } from "..";
import { fetchGQL } from "../../service";
import { useByGenres, useGenres, usePath, useQuery, useTrending } from "../../hooks";
import { Grid } from "../../components/grid";
import { Link, useParams } from "react-router-dom";
import "./genres.css";

export function ByGenre(props){
    const params = useParams();
    const genres = useGenres();
    const genreitems = useByGenres(params.genreId);
     return <Page>
        <ul className="genres">
            {genres.map(genre => {
                return <li>
                    <Link to={`/genre/${genre.id}`} className={genre.id == params.genreId ? "active" : ""}>{genre.name}</Link>
                </li>
            })}
        </ul>
        <h2>{genres.find(genre => genre.id == params.genreId)?.name}</h2>
        <Grid items={genreitems} />
    </Page>
}