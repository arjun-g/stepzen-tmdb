import { useEffect } from "react";
import { Page } from "..";
import { fetchGQL } from "../../service";
import { usePath, usePopular, useQuery, useTopRated, useTrending } from "../../hooks";
import { Grid } from "../../components/grid";

export function TopRated(props){
    const topRated = useTopRated();
     return <Page>
        <h2>Popular</h2>
        <Grid items={topRated} />
    </Page>
}