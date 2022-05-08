// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js')

// workbox.routing.registerRoute(
//   ({ request }) => request.destination === 'image',
//   // new workbox.strategies.CacheFirst()
//   new workbox.strategies.NetworkFirst()
// )

/* Constants & Variables */

const STATIC_CACHE = 's-pwa03-v1'
const DYNAMIC_CACHE = 'd-pwa03-v1'
const IMMUTABLE_CACHE = 'i-pwa03-v1'

const MSG_LISTENER_ID = '/google.firestore.v1.Firestore/Listen/'

const APP_SHELL = [
  '/',
  './',
  'app.js',
  'index.html',
  'firebase-messaging-sw.js',
  'manifest.json',
  'sw.js',
  '../icons/manifest-icon-192.maskable.png',
  'images/amogus.png',
  'scripts/main.js',
  'styles/main.css',
]

const EXTERNAL_RESOURCES = [
  "https://code.getmdl.io/1.1.3/material.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://code.getmdl.io/1.1.3/material.orange-indigo.min.css",
  "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en",
  "https://apis.google.com/js/api.js?onload=__iframefcb317439",
  "https://fonts.gstatic.com/s/materialicons/v128/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
]


/* Functions */

// async function requestBackgroundSync() {
//   await self.registration.sync.register('msg-received');
// }
function identity(args) {
  return args
}


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
self.addEventListener('activate', (e) => {
  console.log('Activate event was triggered!')
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if ([STATIC_CACHE, IMMUTABLE_CACHE, DYNAMIC_CACHE].includes(key)) return
      return caches.delete(key)
    }))
  }));
});

/* Manejo de fetch */
self.addEventListener('fetch', async (evt) => {
  const response = caches.match(evt.request).then(res => {
    if (res) return res

    // Si no existe el archivo en el caché, hacemos fetch en la red:
    return fetch(evt.request).then(newResp => {
      caches.open(DYNAMIC_CACHE).then(cache => {
        if (!(
          evt.request.method === 'POST' ||           // Método POST unsupported
          evt.request.url.includes(MSG_LISTENER_ID)  // Request cambia cada vez
        ))
          cache.put(evt.request, newResp)
        else if (evt.request.url.includes(MSG_LISTENER_ID)) {
          cache.match('msgHistory').then(msgHistResponse => {
            const history = msgHistResponse || new Response('', { status: 200 })
            history.text().then(histText => {
              newResp.text().then(text => {
                const finalResp = new Response(histText + text, { status: 200 })
                cache.put('msgHistory', finalResp)
              })
            })
          })
        }
      })
      return newResp.clone()
    })
  })

  evt.respondWith(response)
})

self.addEventListener('sync', evt => {
  console.log('Hurraaa! Volvió la conexión!')
})
