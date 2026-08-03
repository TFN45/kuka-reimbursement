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
  const url=new URL(e.request.url);
  // Web Share Target: the OS routes a shared photo here as a POST. This is
  // static hosting with no backend, so the service worker itself has to
  // catch it, stash the file, and hand off to the app via a redirect.
  if(e.request.method==='POST'&&url.pathname.endsWith('/index.html')){
    e.respondWith((async()=>{
      try{
        const formData=await e.request.formData();
        const file=formData.get('photos');
        if(file&&file.size>0){
          const cache=await caches.open('share-target-inbox');
          await cache.put('/__shared-photo',new Response(file,{headers:{'Content-Type':file.type||'image/jpeg'}}));
        }
      }catch(err){}
      return Response.redirect('./index.html?share=1',303);
    })());
    return;
  }
  if(e.request.method!=='GET')return;
  const isAppShell=e.request.mode==='navigate'||e.request.destination==='document'||e.request.url.endsWith('index.html')||e.request.url.endsWith('/');
  if(isAppShell){
    // Network-first: always try to get the latest version when online.
    // Falls back to the cached copy only when offline — and if the exact
    // requested URL was never cached (e.g. a bare '/'), fall back to the
    // app shell entry itself rather than failing outright.
    e.respondWith(
      fetch(e.request).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return res;
      }).catch(()=>
        caches.match(e.request).then(cached=>cached||caches.match('./index.html'))
      )
    );
    return;
  }
  // Static assets (icons, manifest): cache-first is fine, they rarely change.
  e.respondWith(
    caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>cached))
  );
});
