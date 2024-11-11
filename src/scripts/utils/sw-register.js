import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const wb = new WorkboxWindow.Workbox('/sw.js');
      await wb.register();
      console.log('Service Worker registered');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.log('Service Worker not supported in this browser.');
  }
};

export default swRegister;