importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Set configuration for workbox
workbox.setConfig({
  debug: true,
});

const { precaching, routing, strategies } = workbox;
const { precacheAndRoute } = precaching;
const { registerRoute } = routing;
const { StaleWhileRevalidate } = strategies;

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const dataJson = event.data.json();
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };

  event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const chainPromise = async () => {
    console.log('Notification has been clicked');
    await self.clients.openWindow('https://www.dicoding.com/');
  };

  event.waitUntil(chainPromise());
});

const BASE_URL = 'https://restaurant-api.dicoding.dev';

registerRoute(
  ({ url }) => {
    return url.href.startsWith(BASE_URL);
  },
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
  }),
);