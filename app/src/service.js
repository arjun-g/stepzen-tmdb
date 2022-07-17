export async function fetchGQL(query){
    const resp = await fetch(
        "https://lakebluff.stepzen.net/api/tmdb/__graphql",
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ query })
        }
    );
    return await resp.json();
}