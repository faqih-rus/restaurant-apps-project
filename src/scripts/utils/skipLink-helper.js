const skipLinkHelper = document.querySelector('.skip-link');

if (skipLinkHelper) {
  skipLinkHelper.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#mainContent').focus();
  });
}

export default skipLinkHelper;