// sw.js
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

self.workbox.setConfig({
  debug: true,
});

const { precaching, routing, strategies, cacheableResponse } = self.workbox;
const { precacheAndRoute } = precaching;
const { registerRoute } = routing;
const { StaleWhileRevalidate, CacheFirst } = strategies;
const { CacheableResponsePlugin } = cacheableResponse;
const { ExpirationPlugin } = self.workbox.expiration;

const BASE_URL = 'https://restaurant-api.dicoding.dev';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigation
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
  })
);

registerRoute(
  ({ url }) => url.href === `${BASE_URL}/list`,
  new CacheFirst({
	  cacheName: 'restaurant-list-cache',
	  plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
		  maxEntries: 50,
		  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
      }),
	  ],
  })
);

// Cache CSS, JS, and Web Worker files
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache API requests
registerRoute(
  ({ url }) => url.href.startsWith(BASE_URL),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Handle other API requests with StaleWhileRevalidate
registerRoute(
  ({ url }) => url.origin === BASE_URL && url.pathname !== '/list',
  new StaleWhileRevalidate({
	  cacheName: 'restaurant-api-cache',
	  plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
	  ],
  })
);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});