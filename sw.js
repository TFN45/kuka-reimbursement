const CACHE='kuka-reimb-shell-v3';
const ASSETS=['./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isAppShell=e.request.mode==='navigate'||e.request.destination==='document'||e.request.url.endsWith('index.html')||e.request.url.endsWith('/');
  if(isAppShell){
    // Network-first: always try to get the latest version when online.
    // Falls back to the cached copy only when offline.
    e.respondWith(
      fetch(e.request).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return res;
      }).catch(()=>caches.match(e.request))
    );
    return;
  }
  // Static assets (icons, manifest): cache-first is fine, they rarely change.
  e.respondWith(
    caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>cached))
  );
});
