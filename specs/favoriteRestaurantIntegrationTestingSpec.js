/* eslint-disable no-undef */
import FavoriteRestaurantsIdb from '../src/scripts/data/favorite-restaurants-idb';
import FavoriteRestaurantModel from './contract/favoriteRestaurantContract';

describe('Showing favorite restaurant:', () => {
    afterEach(async () => {
        (await FavoriteRestaurantsIdb.getAllRestaurants()).forEach(async (restaurant) => {
            await FavoriteRestaurantsIdb.deleteRestaurant(restaurant.id);
        });
      });
    FavoriteRestaurantModel(FavoriteRestaurantsIdb);
});
