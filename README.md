# Simple CORS proxy

A very simple CORS proxy to `GET` various things without having to worry about... well, CORS.
The original aim as to retrieve files and such from GitHub (e.g., Artifacts and what-have-you);
specifically, this was created to support the [**kana**](https://github.com/jkanche/kana) application, to allow it to grab stuff from GitHub for free.

Usage is very simple: hit the endpoint with an encoded URI and the proxy will do a `fetch`, passing back the contents and the content type.
For example:

```js
let base = "https://cors-proxy.aaron-lun.workers.dev";
let target = "https://github.com/LTLA/singlepp-references/releases/download/hs-latest/NovershternHematopoietic_matrix.csv.gz";
let full = base + "/" + encodeURIComponent(target);

// Get the full file.
let X = await fetch(full)

// Range requests.
let X2 = await fetch(base + "/" + encodeURIComponent(target) + "?start=100&end=200")
```
