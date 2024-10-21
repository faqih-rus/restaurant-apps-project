import 'regenerator-runtime';
import '../styles/main.scss';
// import '../styles/main.css';


const restaurantsPerPage = 3;
let currentPage = 1;

async function fetchRestaurants(page = 1) {
    try {
        const response = await fetch('https://restaurant-api.dicoding.dev/list');
        const data = await response.json();
        const paginatedRestaurants = data.restaurants.slice(
            (page - 1) * restaurantsPerPage,
            page * restaurantsPerPage
        );
        
        displayRestaurants(paginatedRestaurants);
        toggleLoadMoreButton(page, data.restaurants.length);
    } catch (error) {
        handleFetchError(error);
    }
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurant-list');
    restaurants.forEach((restaurant) => {
        const restaurantCard = createRestaurantCard(restaurant);
        restaurantList.appendChild(restaurantCard);
    });
}

function createRestaurantCard(restaurant) {
    const restaurantCard = document.createElement('article');
    restaurantCard.classList.add('restaurant-card');
    restaurantCard.setAttribute('tabindex', '0');
    restaurantCard.innerHTML = `
        <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image" tabindex="0" />
        <div class="restaurant-info">
            <p class="restaurant-name">${restaurant.name}</p>
            <p class="restaurant-location">Kota: ${restaurant.city}</p>
            <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
            <p class="restaurant-description">${restaurant.description}</p>
        </div>
    `;
    return restaurantCard;
}

function toggleLoadMoreButton(page, totalRestaurants) {
    const loadMoreButton = document.getElementById('load-more-btn');
    if (page * restaurantsPerPage >= totalRestaurants) {
        loadMoreButton.style.display = 'none';
    }
}

function handleFetchError(error) {
    console.error('Error fetching restaurant data:', error);
    document.getElementById('restaurant-list').innerHTML = '<p>Failed to load restaurant data.</p>';
}

function setupLoadMoreButton() {
    document.getElementById('load-more-btn').addEventListener('click', () => {
        currentPage++;
        fetchRestaurants(currentPage);
    });
}

function setupDOMContentLoaded() {
    document.addEventListener('DOMContentLoaded', () => {
        fetchRestaurants(currentPage);
    });
}

function setupStartButton() {
    document.querySelector('.btn-start').addEventListener('click', () => {
        document.getElementById('restaurant-list').scrollIntoView({ behavior: 'smooth' });
    });
}

function initializeEventListeners() {
    setupLoadMoreButton();
    setupDOMContentLoaded();
    setupStartButton();
}

initializeEventListeners();

const hamburgerButton = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('nav ul');

hamburgerButton.addEventListener('click', () => {
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
    hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    hamburgerButton.classList.toggle('active');
    navMenu.classList.toggle('active');
});
