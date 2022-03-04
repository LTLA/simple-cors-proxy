import { Router } from 'itty-router'

// Create a new router
const router = Router()

router.get("/:url", async ({params}) => {
    let resp = await fetch(decodeURIComponent(params.url));
    let options = { headers: { 'Access-Control-Allow-Origin': '*' } };
    
    if (!resp.ok) {
        options.status = resp.status;
        options.headers["Content-Type"] = resp.headers.get("Content-Type");
    } 

    return new Response(resp.body, options);
})

addEventListener('fetch', event => {
    event.respondWith(
        router
            .handle(event.request)
            .catch(error => new Response(error.message || 'Server Error', { status: error.status || 500 }))
    )
})
