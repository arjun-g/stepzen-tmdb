import { useEffect } from "react";
import { Page } from "..";
import { fetchGQL } from "../../service";
import { usePath, useQuery, useTrending } from "../../hooks";
import { Grid } from "../../components/grid";

export function Home(props){
    const trending = useTrending();
     return <Page>
        <Grid items={trending} />
    </Page>
}