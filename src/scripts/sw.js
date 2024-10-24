// sw.js
import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import CONFIG from '../scripts/globals/config.js';

// Precache manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache untuk assets statis
registerRoute(
  ({ request }) => request.destination === 'style' ||
                   request.destination === 'script' ||
                   request.destination === 'image',
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

// Cache untuk API requests
registerRoute(
  ({ url }) => url.origin === CONFIG.BASE_URL,
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60, // 1 hari
      }),
    ],
  })
);

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Hapus cache lama
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!['assets-cache', 'api-cache'].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});