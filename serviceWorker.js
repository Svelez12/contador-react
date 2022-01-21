const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
    "./index.js"
]

const CACHE_NAME = "v5_cache_contador_react";

//Se registra y se instala serviceWorker.
self.addEventListener("install", (e) => {
    //Espera a que algo suceda.
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch(console.log);
        })
    );
});

//Se registra y se instala serviceWorker.
self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    //Espera a que algo suceda.
    e.waitUntil(
        caches.keys().then((chacheNames) => {
            return Promise.all(chacheNames.map(cacheName => {
                return (cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName));
            }))
        }).then(() => self.clients.claim())
    );
});

//Fetch, si existe retorna del cache, de lo contrario de internet.
self.addEventListener("fetch", (e) => {
    e.respondWith(() => {
        caches.match(e.request).then((res) => (res ? res : fetch(e.request)));
    })
});