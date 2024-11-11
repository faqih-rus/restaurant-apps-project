import FavoriteRestaurantIdb from '../../data/favorite-restaurant.js';
import { createRestaurantItemTemplate } from '../../views/templates/template-creator.js';
import Swal from 'sweetalert2';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Memuat daftar restoran favorit',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantsContainer = document.querySelector('#restaurants');

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML =
          '<p class="empty-favorite">You have no favorite restaurants yet.</p>';
      } else {
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      }

      Swal.close();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat restoran favorit. Silakan coba lagi.',
      });
    }
  },
};

export default Favorite;