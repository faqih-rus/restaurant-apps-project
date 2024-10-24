// sw-register.js
const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.bundle.js', {
        scope: '/',
      });

      console.log('SW registered with scope:', registration.scope);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('Service Worker update found!');

        newWorker.addEventListener('statechange', () => {
          console.log('Service Worker state:', newWorker.state);
        });
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  } else {
    console.log('Service Worker tidak didukung di browser ini');
  }
};

export default swRegister;
