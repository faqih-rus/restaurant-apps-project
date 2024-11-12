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
const DETAIL_URL_PREFIX = `${BASE_URL}/detail/`;

// Define a global cache name prefix
const CACHE_NAME = 'RestaurantCatalogue-V1';

// Precaching the application shell
precacheAndRoute(self.__WB_MANIFEST);

// Cache navigation pages with a prefixed name
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: `${CACHE_NAME}-pages`,
  })
);

// Cache the restaurant list API response
registerRoute(
  ({ url }) => url.href === `${BASE_URL}/list`,
  new CacheFirst({
    cacheName: `${CACHE_NAME}-restaurant-list`,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Cache CSS, JS, and Worker files
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: `${CACHE_NAME}-assets`,
  })
);

// Cache images with a prefixed name
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${CACHE_NAME}-images`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache restaurant detail pages with a prefixed name
registerRoute(
  ({ url }) => url.href.startsWith(DETAIL_URL_PREFIX),
  new CacheFirst({
    cacheName: `${CACHE_NAME}-restaurant-detail`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Fetch and cache all restaurant detail pages upon install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(`${CACHE_NAME}-restaurant-detail`).then(async (cache) => {
      try {
        const response = await fetch(`${BASE_URL}/list`);
        const data = await response.json();

        if (data.restaurants) {
          const detailRequests = data.restaurants.map((restaurant) =>
            fetch(`${DETAIL_URL_PREFIX}${restaurant.id}`).then((response) => {
              if (response.ok) {
                return cache.put(`${DETAIL_URL_PREFIX}${restaurant.id}`, response);
              }
            })
          );
          await Promise.all(detailRequests);
          console.log('All restaurant detail pages pre-cached');
        }
      } catch (error) {
        console.error('Error pre-caching detail pages:', error);
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('restaurant-app-') && cacheName !== CACHE_NAME) {
            console.log('Deleting outdated cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
