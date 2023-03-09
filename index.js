import { Router } from 'itty-router'

// Create a new router
const router = Router()

router.get("/:url", async ({ params, query }) => {
    let resp;
    if ("start" in query && "end" in query) {
        resp = await fetch(decodeURIComponent(params.url), { headers: { Range: "bytes=" + String(query.start) + "-" + String(query.end) } });
    } else {
        resp = await fetch(decodeURIComponent(params.url));
    }

    let headers = new Headers(resp.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    let options = {
        status: resp.status,
        statusText: resp.statusText,
        headers: headers
    };

    return new Response(resp.body, options);
})

addEventListener('fetch', event => {
    event.respondWith(
        router
            .handle(event.request)
            .catch(error => new Response(error.message || 'Server Error', { status: error.status || 500 }))
    )
})
