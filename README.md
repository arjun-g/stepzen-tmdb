# stepzen-tmdb

## Requirements

- StepZen Account (https://stepzen.com/) - for GraphQL
- TMDB Developer API Key (http://developers.themoviedb.org/) - for Movie/TV data
- MongoDB Data API Key (https://www.mongodb.com/atlas/database) - To store data
- Cloudflare Page (https://pages.cloudflare.com/) - To host the static files and proxy the StepZen api

## Get Started

### Starting StepZen

The StepZen schema and config are present in `stepzen` folder. You can use `stepzen start` to deploy and watch the graphql apis. Before that create a `config.yaml` file in the `stepzen` folder with the below content.

```
configurationset:
  - configuration:
      name: curl_import_config
      authorization: Bearer <TMDB Auth Key>
  - configuration:
      name: mongo_data_config
      apiKey: <MongoDB Atlas API Key>
```

### Starting Web App

The Web App react code if present in `app` folder. You can use `npm start` to run it locally. Before running create a  `.env.development` file in `app` folder with the below content.

```
REACT_APP_API_URL=<StepZen GraphQL Endpoint>
REACT_APP_STEPZEN_KEY=<StepZen Key>
```

## Additional Details

### Cloudflare Proxying

To hide the StepZen Api Key Cloudflare Page is used to proxy the endpoint so that the api key can be added in backend.

```
export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const newRequest = new Request(
    "https://lakebluff.stepzen.net/api/tmdb/__graphql",
    request
  );
  newRequest.headers.set("Authorization", `Apikey ${env.STEPZEN_API_KEY}`);
  let response = await fetch(newRequest);
  response = new Response(response.body, response);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Access-Control-Allow-Headers", request.headers.get(
    "Access-Control-Request-Headers"
  ));
  return response;
}
```

## TODO
Complete the GraphQL implementation for TMDB with StepZen

## Known Issues
Due to some issues with TMDB api the GraphQL endpoint fails at random with "Bad Request". Need to figure out hte cause for this.