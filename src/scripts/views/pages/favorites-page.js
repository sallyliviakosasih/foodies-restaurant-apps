import FavoriteRestaurantsIdb from '../../data/favorite-restaurants-idb';
import { dataCatalogueRestaurant, createFailToLoadData, createEmptyData } from '../templates/template-creator';

const Favorites = {
    async render() {
        return `
        <section class="restaurant section">
          <h2 class="section-title">Favorited Restaurants</h2>
          <div class="restaurants catalogue"></div>
        </section>
        `;
      },
      async afterRender() {
        window.scrollTo(0, 0);
        const restaurant_catalogue = document.querySelector('.restaurants');
        try {
          const raw_restaurants = await FavoriteRestaurantsIdb.getAllRestaurants();
          if (raw_restaurants.length === 0) {
            restaurant_catalogue.style.display = 'block';
            restaurant_catalogue.innerHTML = createEmptyData;
          } else {
            raw_restaurants.forEach((restaurant) => {
              restaurant_catalogue.innerHTML += dataCatalogueRestaurant(restaurant);
            });
          }
        } catch (error) {
            restaurant_catalogue.style.display = 'block';
            restaurant_catalogue.style.backgroundColor = 'white';
            restaurant_catalogue.innerHTML = '';
            restaurant_catalogue.innerHTML = createFailToLoadData;
        }
    },
};

export default Favorites;
