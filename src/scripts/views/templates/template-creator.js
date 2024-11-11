import CONFIG from '../../globals/config.js';

// const getResponsiveImageUrl = (pictureId, viewportWidth) => {
// 	if (!pictureId) return '../../public/images/hero-image_1.jpg';
// 	return viewportWidth <= 600
// 	  ? CONFIG.BASE_IMAGE_URL_SMALL + pictureId
// 	  : CONFIG.BASE_IMAGE_URL_MEDIUM + pictureId;
// };

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <div class="restaurant-detail__header">
      <h2 class="restaurant__name">${restaurant.name || 'N/A'}</h2>
      <picture>
        <source 
          media="(max-width: 600px)" 
          data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + (restaurant.pictureId || '')}"
          type="image/jpeg">
        <source 
          media="(min-width: 601px)" 
          data-srcset="${CONFIG.BASE_IMAGE_URL_MEDIUM + (restaurant.pictureId || '')}"
          type="image/jpeg">
        <img class="restaurant__image lazyload" 
          data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + (restaurant.pictureId || '')}"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="${restaurant.name || 'Restaurant Image'}" />
      </picture>
    </div>

    <div class="restaurant__info">
      <div class="restaurant__info-main">
        <div class="info-item">
          <h4>City</h4>
          <p>${restaurant.city || 'Unknown'}</p>
        </div>
        <div class="info-item">
          <h4>Address</h4>
          <p>${restaurant.address || 'No address available'}</p>
        </div>
        <div class="info-item">
          <h4>Rating</h4>
          <p>⭐️ ${restaurant.rating || 'N/A'}</p>
        </div>
      </div>

      <div class="restaurant__categories">
        <h4>Categories</h4>
        <div class="categories-list">
          ${(restaurant.categories || []).map((category) => `
            <span class="category-tag">${category.name}</span>
          `).join('') || '<p>No categories available</p>'}
        </div>
      </div>

      <div class="restaurant__description">
        <h4>Description</h4>
        <p>${restaurant.description || 'No description available'}</p>
      </div>

      <div class="restaurant__menus">
        <div class="menu-section">
          <h4>Food Menu</h4>
          <ul>
            ${(restaurant.menus?.foods || []).map((food) => `
              <li>${food.name}</li>
            `).join('') || '<p>No food available</p>'}
          </ul>
        </div>
        <div class="menu-section">
          <h4>Drink Menu</h4>
          <ul>
            ${(restaurant.menus?.drinks || []).map((drink) => `
              <li>${drink.name}</li>
            `).join('') || '<p>No drinks available</p>'}
          </ul>
        </div>
      </div>
    </div>

    <div class="restaurant__reviews">
      <h3>Customer Reviews</h3>
      <div class="review-form">
        <h4>Add Your Review</h4>
        <form id="reviewForm">
          <div class="form-group">
            <input type="text" id="reviewName" name="name" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <textarea id="reviewText" name="review" placeholder="Your Review" required></textarea>
          </div>
          <button type="submit" class="submit-review">Submit Review</button>
        </form>
      </div>
      <div class="reviews-list">
        ${(restaurant.customerReviews || []).map((review) => `
          <div class="review-item">
            <div class="review-header">
              <h4>${review.name}</h4>
              <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.review}</p>
          </div>
        `).join('') || '<p>No reviews yet</p>'}
      </div>
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <picture>
        <source 
          media="(max-width: 600px)" 
          data-srcset="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId : '../../public/images/hero-image_1.jpg'}"
          type="image/jpeg">
        <source 
          media="(min-width: 601px)" 
          data-srcset="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId : '../../public/images/hero-image_1.jpg'}"
          type="image/jpeg">
        <img class="restaurant-item__thumbnail lazyload"
          data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId : '../../public/images/hero-image_1.jpg'}"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="${restaurant.name || 'Restaurant Image'}"
          crossorigin="anonymous">
      </picture>
      <div class="restaurant-item__rating">
        <p>⭐️<span class="rating-score">${restaurant.rating || 'N/A'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant-item__title">
        <a href="#/detail/${restaurant.id}">${restaurant.name || 'N/A'}</a>
      </h3>
      <p class="restaurant-item__city">${restaurant.city || 'Unknown'}</p>
      <p class="restaurant-item__description">
        ${restaurant.description || 'No description available'}
      </p>
    </div>
  </div>
`;

const createLoadingTemplate = () => `
  <div class="loading">
    <div class="loading-spinner"></div>
    <p>Loading...</p>
  </div>
`;

const createErrorTemplate = (message) => `
  <div class="error">
    <p>${message || 'Something went wrong'}</p>
    <button class="retry-button">Retry</button>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLoadingTemplate,
  createErrorTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};