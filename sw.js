self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('moonboard-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './mini_moonboard_bg.jpg',
        './icon-192.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
