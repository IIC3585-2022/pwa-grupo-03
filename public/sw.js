// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js')

// workbox.routing.registerRoute(
//   ({ request }) => request.destination === 'image',
//   new workbox.strategies.CacheFirst()
//   // new workbox.strategies.NetworkFirst()
// )

/* Constants & Variables */


const STATIC_CACHE = 's-pwa03-v1'
const DYNAMIC_CACHE = 'd-pwa03-v1'
const IMMUTABLE_CACHE = 'i-pwa03-v1'
const ALL_CACHE = [STATIC_CACHE, IMMUTABLE_CACHE, DYNAMIC_CACHE]

const MSG_LISTENER_ID = '/google.firestore.v1.Firestore/Listen/'

const APP_SHELL = [
  '/',
  '/app.js',
  '/index.html',
  '/firebase-messaging-sw.js',
  '/manifest.json',
  '/sw.js',
  'icons/manifest-icon-192.maskable.png',
  'images/amogus.png',
  'scripts/main.js',
  'styles/main.css',
]

const EXTERNAL_RESOURCES = [
  "https://code.getmdl.io/1.1.3/material.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://code.getmdl.io/1.1.3/material.orange-indigo.min.css",
  "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en",
  "https://fonts.gstatic.com/s/materialicons/v128/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
  "https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1Mu51xIIzIXKMny.woff2"
]


/* Functions */

// async function requestBackgroundSync() {
//   await self.registration.sync.register('msg-received');
// }


/* Listeners */

/* Guardar APP SHELL */
self.addEventListener('install', evt => {

  const staticProm = caches.open(STATIC_CACHE)
    .then(cache => cache.addAll(APP_SHELL))

  const immutableProm = caches.open(IMMUTABLE_CACHE)
    .then(cache => cache.addAll(EXTERNAL_RESOURCES))

  evt.waitUntil(Promise.all([staticProm, immutableProm]))
})

/* Activate */
self.addEventListener('activate', evt => {
  // Borrando cache obsoleto
  evt.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (ALL_CACHE.includes(key)) return
      return caches.delete(key)
    }))
  }));
});

/* Manejo de fetch */
self.addEventListener('fetch', evt => {
  const response = caches.match(evt.request).then(res => {
    if (res) return res  // Estrategia cache-first


    // Si no existe el archivo en el caché, hacemos fetch en la red:
    return fetch(evt.request).then(newResp => {
      caches.open(DYNAMIC_CACHE).then(cache => {
        if (!(
          evt.request.method === 'POST' ||           // Método POST unsupported
          evt.request.url.includes(MSG_LISTENER_ID)  // Request cambia cada vez
        ))
          cache.put(evt.request, newResp)
      })
      return newResp.clone()
    })
  })

  evt.respondWith(response)
})

self.addEventListener('sync', evt => {
  console.log('Hubo sync!')
})
