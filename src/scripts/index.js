import 'regenerator-runtime';
import '../styles/main.scss';
import App from '../scripts/view/app.js';
import swRegister from '../scripts/utils/sw-register.js';


const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  try {
    await app.renderPage();
    await swRegister();
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});
