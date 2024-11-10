const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i++) {
	  template += `
		<div class="restaurant-item skeleton">
		  <div class="restaurant-item__thumbnail skeleton-image"></div>
		  <div class="restaurant-item__content">
			<h3 class="skeleton-text"></h3>
			<p class="skeleton-text"></p>
			<p class="skeleton-text"></p>
		  </div>
		</div>
	  `;
  }
  return template;
};

export { createSkeletonRestaurantTemplate };