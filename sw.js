const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '/index.html',
    '/dist/main.js',
    '/main.css',
    'assets/icon-512x512.png'
];

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
);

self.addEventListener('install', (event) => {
    console.log('service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(resourcesToPrecache))
    );
});

self.addEventListener('activate', () => {
    console.log('service worker activate event!');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => cachedResponse || fetch(event.request))
    );
});

self.addEventListener('push', event => {
    const title = "Yay a message";
    const body = "We have received a push message.";
    const tag = "simple-push-example-tag";
    self.registration.showNotification(title, { body, tag });
});
