const ScrollInitiator = {
  init() {
    const startButton = document.querySelector('.btn-start');

    if (startButton) {
      startButton.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.querySelector('#mainContent');

        if (mainContent) {
          mainContent.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    }
  },
};

export default ScrollInitiator;