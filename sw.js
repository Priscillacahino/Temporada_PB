const CACHE_STATIC='amigos-venus-v8-7-static';
const CACHE_DATA='amigos-venus-v8-6-data';

const STATIC_ASSETS=[
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'version.json',
  'data/imoveis.json',
  'data/meta.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/casa-venus-destaque.jpg',
  'icons/amigos-venus-logo-final.jpg'
];

self.addEventListener('install',event=>{
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache=>cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys=>
        Promise.all(
          keys
            .filter(k=>![CACHE_STATIC,CACHE_DATA].includes(k))
            .map(k=>caches.delete(k))
        )
      ),
      self.clients.claim()
    ])
  );
});

async function networkFirst(request){
  try{
    const response=await fetch(request);

    if(response && response.ok){
      const cache=await caches.open(CACHE_DATA);
      cache.put(request,response.clone());
    }

    return response;
  }catch{
    const cached=await caches.match(request);

    if(cached)return cached;

    if(request.mode==='navigate'){
      return caches.match('index.html');
    }

    throw new Error('offline');
  }
}

async function cacheFirst(request){
  const cached=await caches.match(request);

  if(cached)return cached;

  const response=await fetch(request);

  if(response && response.ok){
    const cache=await caches.open(CACHE_STATIC);
    cache.put(request,response.clone());
  }

  return response;
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;

  const url=new URL(event.request.url);

  // Não tenta armazenar imagens ou recursos externos.
  if(url.origin!==self.location.origin)return;

  if(
    event.request.mode==='navigate' ||
    url.pathname.endsWith('/data/imoveis.json') ||
    url.pathname.endsWith('/data/meta.json') ||
    url.pathname.endsWith('/version.json')
  ){
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});



