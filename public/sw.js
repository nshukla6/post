const CACHE_STATIC = 'static-v5';
const CACHE_DYNAMIC = 'dynamic-v3';

this.addEventListener('install', (e) => {
    console.log('[Installation of sw]');
    e.waitUntil(
        caches.open(CACHE_STATIC).then((cache) => {
            cache.addAll([
                'static/js/bundle.js',
                'manifest.json',
                'logo192.png',
                "/"
            ])
        })

    )
});

this.addEventListener("activate", (e) => {
  console.log(["Activating Service Worker"]);
  e.waitUntil(
    caches.keys().then((keysPromise) => {
        return Promise.all(keysPromise.map(keyPromise => {
            if(keyPromise !== CACHE_STATIC && keyPromise !== CACHE_DYNAMIC){
                console.log(['Removing caches ', keyPromise]);
                return caches.delete(keyPromise);
            }
        }))
    })
  )
});

this.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((result) => {
      if (result) {
        return result;
      }
      const req = e.request.clone();
      return fetch(req)
        .then(res => {
            return caches.open(CACHE_DYNAMIC)
                .then((cache) => {
                    cache.put(req.url, res.clone());
                    return res;
                })
        })
        .catch(() => {
            
        })
    })
  );
});