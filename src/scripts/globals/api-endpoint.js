import CONFIG from './config';

const API_ENDPOINT = {
    HOME: `${CONFIG.BASE_URL}/list`,
    SEARCH_RESTAURANT: `${CONFIG.BASE_URL}/search?q=`,
    DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;
