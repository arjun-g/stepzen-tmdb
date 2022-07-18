export async function fetchGQL(query){
    const resp = await fetch(
        "https://stepzen-tmdb.pages.dev/api",
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