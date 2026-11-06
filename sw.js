'use strict';
const CACHE = 'app-v1.0.0';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // version.json: siempre de la red
  if (url.pathname.endsWith('/version.json')){
    e.respondWith(fetch(req, {cache:'no-store'}).catch(() => new Response('{}', {headers:{'Content-Type':'application/json'}})));
    return;
  }

  // Navegación e index: network-first con respaldo en caché
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')){
    e.respondWith(
      fetch(req).then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copia));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto: stale-while-revalidate
  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(res => {
        if (res.ok){ const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
        return res;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
