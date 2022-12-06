/* eslint-disable max-len */
import RestaurantAPI from '../../data/restaurant-api-source';
import UrlParser from '../../routes/url-parser';
import {
  detailDataImageRestaurant,
  detailDataDescriptionRestaurant,
  detailDataReviewsOfRestaurant,
  createFailToLoadData,
} from '../templates/template-creator';
import LikeButtonFunction from '../../utils/like-button-function';
import AddCommentFunction from '../../utils/add-comment-function';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurants-idb';

const Detail = {
  async render() {
    return `
      <div class="loading"></div>
      <div class="detail-of-restaurant" style="display:none"></div>
      <div id="likeButtonContainer"></div>
      `;
  },
  async afterRender() {
    window.scrollTo(0, 0);
    const detail_section = document.querySelector('.detail-of-restaurant');
    const loading_container = document.querySelector('.loading');
    const url = UrlParser.parsingActiveUrlWithoutCombiner();
    try {
      const raw_detail_restaurant = await RestaurantAPI.detailOfRestaurant(url.id);
      loading_container.style.display = 'none';
      detail_section.style.display = 'block';
      detail_section.append(detailDataImageRestaurant(raw_detail_restaurant), detailDataDescriptionRestaurant(raw_detail_restaurant), detailDataReviewsOfRestaurant(raw_detail_restaurant));
      LikeButtonFunction.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurantdb: FavoriteRestaurantsIdb,
        DataRestaurant: {
          id: raw_detail_restaurant.id,
          name: raw_detail_restaurant.name,
          city: raw_detail_restaurant.city,
          rating: raw_detail_restaurant.rating,
          description: raw_detail_restaurant.description,
          pictureId: raw_detail_restaurant.pictureId,
        },
      });

      const add_comment_button = document.querySelector('.add_comment_button');
      add_comment_button.addEventListener('click', async () => {
        const user_name = document.querySelector('#add_user_name').value;
        const reviews = document.querySelector('#add_user_reviews').value;
        AddCommentFunction.init({
          details_container: detail_section,
          data_commment: {
            id: url.id,
            name: user_name,
            review: reviews,
          },
        });
      });
    } catch (error) {
      loading_container.style.display = 'none';
      detail_section.style.display = 'block';
      detail_section.innerHTML = createFailToLoadData;
    }
  },
};

export default Detail;
