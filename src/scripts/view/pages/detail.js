import RestaurantSource from '../../data/restaurant-api-source.js';
import UrlParser from '../../routes/url-parser.js';
import { createRestaurantDetailTemplate } from '../../views/templates/template-creator.js';
import LikeButtonInitiator from '../../utils/like-button-initiator.js';
import Swal from 'sweetalert2';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');

      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      Swal.close();

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });

      this._initReviewForm(url.id);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat detail restoran. Silakan coba lagi.',
      });
    }
  },

  _initReviewForm(restaurantId) {
    const reviewForm = document.querySelector('#reviewForm');
    if (!reviewForm) {return;}

    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.querySelector('#reviewName');
      const reviewInput = document.querySelector('#reviewText');

      if (!nameInput?.value || !reviewInput?.value) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Nama dan ulasan harus diisi!',
        });
        return;
      }

      Swal.fire({
        title: 'Mengirim Ulasan',
        text: 'Mohon tunggu sementara ulasan Anda dikirim...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await RestaurantSource.postReview({
          id: restaurantId,
          name: nameInput.value,
          review: reviewInput.value,
        });

        Swal.close();

        if (!response.error) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Ulasan Anda telah dikirim!',
          });

          this._addNewReviewToDOM({
            name: nameInput.value,
            review: reviewInput.value,
          });

          nameInput.value = '';
          reviewInput.value = '';
        } else {
          throw new Error(response.message || 'Gagal mengirim ulasan');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi nanti.',
        });
      }
    });
  },

  _addNewReviewToDOM(review) {
    const reviewsContainer = document.querySelector('.reviews-list');
    if (!reviewsContainer) {return;}

    const newReviewHTML = `
      <div class="review-item">
        <div class="review-header">
          <h4>${review.name}</h4>
          <span class="review-date">${new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}</span>
        </div>
        <p class="review-text">${review.review}</p>
      </div>
    `;

    reviewsContainer.insertAdjacentHTML('beforeend', newReviewHTML);
  },
};

export default Detail;