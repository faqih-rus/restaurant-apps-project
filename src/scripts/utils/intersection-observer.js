// src/scripts/utils/intersection-observer.js
const observeElements = (elements, options = {}) => {
  const defaultOptions = {
	  root: null,
	  rootMargin: '0px',
	  threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
	  entries.forEach((entry) => {
      if (entry.isIntersecting) {
		  entry.target.classList.add('fade-in');
		  observer.unobserve(entry.target);
      }
	  });
  }, { ...defaultOptions, ...options });

  elements.forEach((element) => {
	  element.classList.add('hidden');
	  observer.observe(element);
  });
};

export default observeElements;