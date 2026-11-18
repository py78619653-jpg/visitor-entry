const C="vep-v2";
const A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png",
"https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js","https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=e.request.url;
 if(!(u.startsWith(self.location.origin)||u.includes("cdnjs.cloudflare.com")))return;
 e.respondWith(caches.match(e.request).then(r=>{const n=fetch(e.request).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>r);return r||n}))});
