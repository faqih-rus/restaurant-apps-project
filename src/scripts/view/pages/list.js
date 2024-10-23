import RestaurantSource from '../../data/restaurant-api-source.js';
import { createRestaurantItemTemplate } from '../../views/templates/template-creator.js';
import Swal from 'sweetalert2';

const List = {
  async render() {
    return `
        <div class="content">
          <h2 class="content__heading">Explore Restaurants</h2>
          <div id="restaurants" class="restaurants"></div>
        </div>
      `;
  },

  async afterRender() {
    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Memuat daftar restoran',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const restaurants = await RestaurantSource.listRestaurants();
      const restaurantsContainer = document.querySelector('#restaurants');
      const searchInput = document.querySelector('#searchRestaurant');

      const handleRestaurantClick = async (restaurantId) => {
        Swal.fire({
          title: 'Loading...',
          text: 'Memuat detail restoran',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = `/#/detail/${restaurantId}`;
      };

      const renderRestaurants = (filteredRestaurants) => {
        restaurantsContainer.innerHTML = '';
        filteredRestaurants.forEach((restaurant) => {
          const restaurantElement = document.createElement('div');
          restaurantElement.innerHTML = createRestaurantItemTemplate(restaurant);
          const restaurantItem = restaurantElement.firstElementChild;

          restaurantItem.addEventListener('click', () => {
            handleRestaurantClick(restaurant.id);
          });

          restaurantsContainer.appendChild(restaurantItem);
        });
      };

      renderRestaurants(restaurants);
      Swal.close();

      if (searchInput) {
        searchInput.addEventListener('input', async (event) => {
          const query = event.target.value.toLowerCase();
          const filteredRestaurants = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(query),
          );

          renderRestaurants(filteredRestaurants);
          Swal.close();
        });
      }
    } catch (error) {
      console.log('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat daftar restoran. Silakan coba lagi.',
      });
    }
  },
};

export default List;
