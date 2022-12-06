/* eslint-disable max-len */
import CONFIG from '../globals/config';
import RestaurantAPI from '../data/restaurant-api-source';
import { detailDataImageRestaurant, detailDataDescriptionRestaurant, detailDataReviewsOfRestaurant } from '../views/templates/template-creator';

const AddCommentFunction = {
   async init({ details_container, data_commment }) {
        this._details_container = details_container;
        this._data_comments = data_commment;

        await this._fetchRequest(this._data_comments);
        location.reload();
    },
    async _fetchRequest(Data) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            };
            const response = await fetch(`${CONFIG.BASE_URL}/review`, options);
            const responseJSON = await response.json();
            console.log(responseJSON);
        } catch (error) {
            console.log(error.message);
        }
    },

    async _renderData(id) {
        const raw_detail_restaurant = await RestaurantAPI.detailOfRestaurant(id);
        this._details_container.append(detailDataImageRestaurant(raw_detail_restaurant), detailDataDescriptionRestaurant(raw_detail_restaurant), detailDataReviewsOfRestaurant(raw_detail_restaurant));
    },
};

export default AddCommentFunction;
