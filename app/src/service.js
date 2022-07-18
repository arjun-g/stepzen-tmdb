export async function fetchGQL(query){
    const resp = await fetch(
        `${process.env.REACT_APP_API_URL}`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": process.env.REACT_APP_STEPZEN_KEY ? `Apikey ${process.env.REACT_APP_STEPZEN_KEY}` : undefined
            },
            body: JSON.stringify({ query })
        }
    );
    return await resp.json();
}