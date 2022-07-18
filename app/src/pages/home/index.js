import { useEffect } from "react";
import { Page } from "..";
import { fetchGQL } from "../../service";
import { usePath, useQuery, useTrending } from "../../hooks";
import { Grid } from "../../components/grid";

export function Home(props){
    const trending = useTrending();
     return <Page>
        <h2>Trending</h2>
        <Grid items={trending} />
    </Page>
}