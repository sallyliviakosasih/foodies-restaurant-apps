/* eslint-disable import/prefer-default-export */
import FavoriteRestaurantsIdb from '../../src/scripts/data/favorite-restaurants-idb';
import LikeButtonFunction from '../../src/scripts/utils/like-button-function';

const renderLikeButtonPresenter = async (restaurant) => {
    await LikeButtonFunction.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurantdb: FavoriteRestaurantsIdb,
        DataRestaurant: restaurant,
    });
};

export { renderLikeButtonPresenter };
