import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantAPI {
    static async homePage() {
        const response = await fetch(API_ENDPOINT.HOME);
        const responsJSON = await response.json();
        return responsJSON.restaurants;
    }

    static async searchDataRestaurant(user_query) {
        const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT + user_query);
        const responsJSON = await response.json();
        return responsJSON.restaurants;
    }

    static async detailOfRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJSON = await response.json();
        return responseJSON.restaurant;
    }
}

export default RestaurantAPI;
