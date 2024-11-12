// restaurant-api-source.js
import API_ENDPOINT from '../globals/api-endpoint.js';
import CONFIG from '../globals/config.js';

class RestaurantSource {
  static async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST_RESTAURANTS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      if (!responseJson.error && responseJson.restaurants) {
        return responseJson.restaurants;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Error fetching restaurant list:', error);

      try {
        const cache = await caches.open(CONFIG.CACHE_NAME);
        const cachedResponse = await cache.match(API_ENDPOINT.LIST_RESTAURANTS);

        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          return cachedData.restaurants;
        }
      } catch (cacheError) {
        console.error('Error fetching restaurant list from cache:', cacheError);
      }

      throw new Error('Failed to fetch restaurant list from network and cache');
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      if (!responseJson.error && responseJson.restaurant) {
        return responseJson.restaurant;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error(`Error fetching restaurant detail for ID: ${id}`, error);

      try {
        const cache = await caches.open(CONFIG.CACHE_NAME);
        const cachedResponse = await cache.match(API_ENDPOINT.DETAIL_RESTAURANT(id));

        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          return cachedData.restaurant;
        }
      } catch (cacheError) {
        console.error('Error fetching restaurant detail from cache:', cacheError);
      }

      throw new Error(`Failed to fetch restaurant detail for ID: ${id} from network and cache`);
    }
  }

  static async postReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      if (!responseJson.error) {
        return responseJson;
      } else {
        throw new Error(responseJson.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error posting review:', error);

      const offlineReviews = JSON.parse(localStorage.getItem('offlineReviews') || '[]');
      offlineReviews.push(review);
      localStorage.setItem('offlineReviews', JSON.stringify(offlineReviews));

      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const sw = await navigator.serviceWorker.ready;
        await sw.sync.register('sync-reviews');
      }

      return {
        error: false,
        message: 'Review saved offline. It will be sent when online.',
      };
    }
  }
}

export default RestaurantSource;
