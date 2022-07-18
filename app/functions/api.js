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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export function onRequestOptions(request) {
  let respHeaders = {
    ...corsHeaders,
    // Allow all future content Request headers to go back to browser
    // such as Authorization (Bearer) or X-Client-Name-Version
    "Access-Control-Allow-Headers": request.headers.get(
      "Access-Control-Request-Headers"
    ),
  };

  return new Response(null, {
    headers: respHeaders,
  });
}
