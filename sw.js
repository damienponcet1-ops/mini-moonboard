const CACHE_NAME = 'mini-moonboard-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './mini_moonboard_bg.jpg',
    './manifest.json'
];

// Événement d'installation : Mise en cache des ressources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Mise en cache des ressources...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});

// Événement d'activation : Nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Nettoyage de l\'ancien cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Événement fetch : Servir depuis le cache en priorité, sinon réseau
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retourne la version en cache si elle existe, sinon fait la requête réseau
                return response || fetch(event.request);
            })
    );
});
