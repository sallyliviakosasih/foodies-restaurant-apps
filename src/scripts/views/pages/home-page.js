import RestaurantAPI from '../../data/restaurant-api-source';
import {
  dataCatalogueRestaurant,
  dataSearchResultRestaurant,
  emptyDataSearchResultRestaurant,
  createFailToLoadData,
} from '../templates/template-creator';

const Home = {
    async render() {
      return `
          <div class="hero-container">
              <div class="hero-inner">
                  <h2 id="hero-title">Find The Most Recommended Restaurants</h2>
                  <h3 id="hero-caption">Variants of Indonesia's Top Rated Restaurants and The Most Recommended Foods</h3>
              </div>
          </div>
          <section class="restaurant section">
              <h2 class="section-title">Catalogue Of Restaurants</h2>
              <search-bar></search-bar>
              <div class="results-column"></div>
              <div class="restaurants catalogue"></div>
          </section>
          <section class="upcoming-features section" id="upcoming-features">
          <h2 class="section-title">Upcoming Features</h2>
          <div class="feature-details">
            <div class="feature-container">
              <img src="./images/icons/restaurant.png" alt="feature picture" class="feature-pict">
              <h3 class="feature-title">More Restaurants</h3>
              <p class="feature-desc">More restaurant details are coming soon to help you know more about the restaurant</p>
            </div>
            <div class="feature-container">
              <img src="./images/icons/menu.png" alt="feature picture" class="feature-pict">
              <h3 class="feature-title">Food's Catalogue</h3>
              <p class="feature-desc">Variants of The Most Favorite Food and the details of the food will be listed</p>
            </div>
            <div class="feature-container">
              <img src="./images/icons/comment.png" alt="feature picture" class="feature-pict">
              <h3 class="feature-title">User's Comments</h3>
              <p class="feature-desc">Showing user's comments about the restaurants and foods to help you know more about it</p>
            </div>
          </div>
        </div>
      </section>
      `;
    },
    async afterRender() {
      window.scrollTo(0, 0);
      const restaurantCatalogue = document.querySelector('.restaurants');
      try {
      const raw_restaurants = await RestaurantAPI.homePage();
      raw_restaurants.forEach((restaurant) => {
          restaurantCatalogue.innerHTML += dataCatalogueRestaurant(restaurant);
      });
      this._searchDataRestaurant();
    } catch (error) {
      restaurantCatalogue.style.display = 'block';
      restaurantCatalogue.style.backgroundColor = 'white';
      restaurantCatalogue.innerHTML = '';
      restaurantCatalogue.innerHTML = createFailToLoadData;
    }
    },

    _searchDataRestaurant() {
      const search_element = document.querySelector('search-bar');
      const results_colum = document.querySelector('.results-column');
      const search_button_clicked = async () => {
        const raw_data_result = await RestaurantAPI.searchDataRestaurant(search_element.value);
        if (raw_data_result.length !== 0) {
          raw_data_result.forEach((raw_datum_result) => {
            results_colum.innerHTML += dataSearchResultRestaurant(raw_datum_result);
          });
        } else {
          results_colum.innerHTML += emptyDataSearchResultRestaurant();
        }
      };

      const reset_search_column = () => {
        results_colum.innerHTML = '';
      };

      search_element.clickEvent = search_button_clicked;
      search_element.resetSearchColumn = reset_search_column;
    },
  };

export default Home;
