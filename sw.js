const CACHE='layering-lab-v4-pwa-20261025-2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/layering-lab.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys()){if(k.startsWith('layering-lab-')&&k!==CACHE)await caches.delete(k)}await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
if(q.mode==='navigate'){e.respondWith((async()=>{try{const r=await fetch(q);if(r.ok)(await caches.open(CACHE)).put('./index.html',r.clone());return r}catch{return (await caches.open(CACHE)).match('./index.html')||Response.error()}})());return}
e.respondWith((async()=>{const c=await caches.open(CACHE),old=await c.match(q);if(old)return old;try{const r=await fetch(q);if(r.ok)c.put(q,r.clone());return r}catch{return Response.error()}})())});
