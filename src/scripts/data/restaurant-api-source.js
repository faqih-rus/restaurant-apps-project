import CONFIG from '../globals/config.js';

class RestaurantApiSource {
  static async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
      return null;
    }
  }

  static async listRestaurants() {
    const url = `${CONFIG.BASE_URL}${CONFIG.API_ENDPOINTS.LIST}`;
    const response = await this.fetchData(url);
    return response ? response.restaurants : [];
  }

  static async detailRestaurant(id) {
    const url = `${CONFIG.BASE_URL}${CONFIG.API_ENDPOINTS.DETAIL(id)}`;
    const response = await this.fetchData(url);
    return response ? response.restaurant : null;
  }

  static async searchRestaurant(query) {
    const url = `${CONFIG.BASE_URL}${CONFIG.API_ENDPOINTS.SEARCH(query)}`;
    const response = await this.fetchData(url);
    return response ? response.restaurants : [];
  }

  static async postReview(review) {
    const url = `${CONFIG.BASE_URL}${CONFIG.API_ENDPOINTS.REVIEW}`;
    const response = await this.fetchData(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return response ? response.customerReviews : null;
  }
}

export default RestaurantApiSource;
