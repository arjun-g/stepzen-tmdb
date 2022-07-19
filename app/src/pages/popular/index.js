import { useEffect } from "react";
import { Page } from "..";
import { fetchGQL } from "../../service";
import { usePath, usePopular, useQuery, useTrending } from "../../hooks";
import { Grid } from "../../components/grid";

export function Popular(props){
    const popular = usePopular();
    const query = useQuery();
     return <Page>
        <h2>Popular</h2>
        <Grid items={popular} mediaType={query.media} />
    </Page>
}