const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  BASE_IMAGE_URL_SMALL: 'https://restaurant-api.dicoding.dev/images/small/',
  BASE_IMAGE_URL_MEDIUM: 'https://restaurant-api.dicoding.dev/images/medium/',
  BASE_IMAGE_URL_LARGE: 'https://restaurant-api.dicoding.dev/images/large/',
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'RestaurantCatalogue-V1',
  DATABASE_NAME: 'restaurant-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
  WEB_SOCKET_SERVER: 'wss://movies-feed.dicoding.dev',
  API_ENDPOINTS: {
    LIST: 'list',
    DETAIL: (id) => `detail/${id}`,
    SEARCH: (query) => `search?q=${query}`,
    REVIEW: 'review',
  },
};

export default CONFIG;