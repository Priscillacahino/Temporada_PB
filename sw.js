const CACHE_STATIC = 'temporada-pb-v17-static';
const CACHE_DATA = 'temporada-pb-v17-data';

const STATIC_ASSETS = [
  './',
  'index.html',
  'styles.css?v=9.2.2',
  'app.js?v=9.2.2',
  'manifest.json',
  'version.json',
  'data/imoveis.json',
  'data/meta.json',
  'icons/temporada-pb-logo.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_STATIC).then(cache => cache.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(
      keys.filter(key => ![CACHE_STATIC, CACHE_DATA].includes(key)).map(key => caches.delete(key))
    )),
    self.clients.claim()
  ]));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_DATA);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') return caches.match('index.html');
    throw new Error('offline');
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const networkPromise = fetch(request).then(async response => {
    if (response && response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  if (cached) {
    networkPromise.catch(() => null);
    return cached;
  }

  return (await networkPromise) || Response.error();
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('/data/imoveis.json') ||
    url.pathname.endsWith('/data/meta.json') ||
    url.pathname.endsWith('/version.json')
  ) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request));
});
