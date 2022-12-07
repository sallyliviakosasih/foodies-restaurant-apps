import CONFIG from '../../globals/config';

const dataCatalogueRestaurant = (restaurant) => `
    <div class="data-restaurant">
        <picture>
            <source type="image/webp" media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}">
            <img class="pict-restaurant lazyload" data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="picture of ${restaurant.name}">
        </picture>
        <div class="restaurant-detail">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <h4 class="restaurant-city">${restaurant.city}</h4>
            <h4 class="restaurant-rates">${restaurant.rating}</h4>
            <p class="restaurant-desc">${restaurant.description}</p>
        </div>
        <a href="#/detail/${restaurant.id}" class="more-detail-button">See More Detail</a>
    </div>
`;
const dataSearchResultRestaurant = (restaurant) => `
    <div class="result">
        <picture class="pict-result">
            <source type="image/webp" media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}">
            <img class="pict-result" src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="picture of ${restaurant.name}">
        </picture>
        <h4 class="restaurant-result-name">${restaurant.name}</h4>
        <h5 class="restaurant-result-city">${restaurant.city}</h5>
        <h5 class="restaurant-result-rates">${restaurant.rating}</h5>
        <p class="restaurant-result-desc">${restaurant.description}</p>
    </div>
`;
const emptyDataSearchResultRestaurant = () => `
    <h4 class="empty-result">Restaurant Not Found</h4>
`;

const detailDataImageRestaurant = (restaurant) => {
    const image_section = document.createElement('section');
    image_section.classList.add('image_section');

    const image_of_restaurant_container = document.createElement('picture');
    image_of_restaurant_container.innerHTML = `
        <source type="image/webp" media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}">
        <img class="image_of_restaurant" src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="picture of ${restaurant.name}">
    `;
    image_section.appendChild(image_of_restaurant_container);
    return (image_section);
};

const detailCategoriesOfRestaurant = (categories) => {
    const categories_container = document.createElement('section');
    categories_container.classList.add('detail_categories_section');

    categories.forEach((category) => {
        const list_of_category = document.createElement('p');
        list_of_category.innerHTML = `${category.name}`;
        categories_container.append(list_of_category);
    });
    return categories_container;
};

const detailFoodOfRestaurant = (foods) => {
    const foods_container = document.createElement('section');
    foods_container.classList.add('detail_foods_section');
    foods_container.innerHTML = '<h3>Foods</h3>';
    foods.forEach((food) => {
        const list_of_food = document.createElement('p');
        list_of_food.innerHTML = `${food.name}`;
        foods_container.append(list_of_food);
    });
    return foods_container;
};

const detailDrinkOfRestaurant = (drinks) => {
    const drinks_container = document.createElement('section');
    drinks_container.classList.add('detail_drinks_section');
    drinks_container.innerHTML = '<h3>Drinks</h3>';

    drinks.forEach((drink) => {
        const list_of_drink = document.createElement('p');
        list_of_drink.innerHTML = `${drink.name}`;
        drinks_container.append(list_of_drink);
    });
    return drinks_container;
};

const detailDataDescriptionRestaurant = (restaurant) => {
    const details_section = document.createElement('section');
    details_section.classList.add('details_section');

    const detail_col1 = document.createElement('div');
    detail_col1.classList.add('details_column1');

    const title_section = document.createElement('section');
    title_section.classList.add('detail_title_section');
    title_section.innerHTML = `<h2 id="restaurant_title">${restaurant.name}</h2>`;

    const categories_section = detailCategoriesOfRestaurant(restaurant.categories);

    const location_section = document.createElement('section');
    location_section.classList.add('detail_location_section');
    location_section.innerHTML = `
        <h4>${restaurant.address}, ${restaurant.city}</h4>
    `;

    const description_section = document.createElement('section');
    description_section.classList.add('detail_description_section');
    description_section.innerHTML = `
        <h3>Description</h3>
        <p>${restaurant.description}</p>
    `;
    detail_col1.append(title_section, categories_section, location_section, description_section);

    const detail_col2 = document.createElement('div');
    detail_col2.classList.add('details_column2');

    const foods_section = detailFoodOfRestaurant(restaurant.menus.foods);
    const drink_section = detailDrinkOfRestaurant(restaurant.menus.drinks);

    detail_col2.append(foods_section, drink_section);
    details_section.append(detail_col1, detail_col2);

    return details_section;
};

const addNewCommentsOfRestaurant = () => {
    const NewComment_container = document.createElement('div');
    NewComment_container.classList.add('add_user_comment');
    NewComment_container.innerHTML = `
        <input type="text" class="add_comment" id="add_user_name" placeholder="Add Your Name"></input>
        <textarea placeholder="Add Your Reviews" id="add_user_reviews"></textarea>
        <button class="add_comment_button">Add Comment</button>
    `;
    return NewComment_container;
};

const detailUserCommentsOfRestaurant = (comments) => {
    const comments_container = document.createElement('div');
    comments_container.classList.add('detail_user_comments_section');
    comments_container.innerHTML = '<h4>User\'s Comments : </h4>';

    comments.forEach((comment) => {
        const user_comment = document.createElement('div');
        user_comment.classList.add('user_comments');
        user_comment.innerHTML = `
            <h5 class="user_name">${comment.name}</h5>
            <p class="comment_date">${comment.date}</p>
            <p class="comment">"${comment.review}"</p>
        `;
        comments_container.append(user_comment);
    });
    const add_user_reviews = addNewCommentsOfRestaurant();
    comments_container.append(add_user_reviews);
    return comments_container;
};

const detailDataReviewsOfRestaurant = (restaurant) => {
    const reviews_section = document.createElement('section');
    reviews_section.classList.add('reviews_section');
    reviews_section.innerHTML = `
        <h4 class="detail_user_rating">Rates : ${restaurant.rating}</h4>
    `;

    const user_reviews = detailUserCommentsOfRestaurant(restaurant.customerReviews);
    reviews_section.append(user_reviews);
    return reviews_section;
};

const createLikeButtonTemplate = () => `
    <button aria-label="Like the restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeButtonTemplate = () => `
    <button aria-label="Unlike the restaurant" id="unlikeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;
const createFailToLoadData = `
    <div class="fail_load_container">
        <img src="./images/icons/failed_icon.png" alt="fail to load icon" class="fail_to_load_icon">  
        <h4>Fail to load content</h4>
    </div>
`;

const createEmptyData = `
    <div class="empty_data_container">
        <h4>No Data Could be Displayed</h4>
    </div>
`;

export {
    dataCatalogueRestaurant,
    dataSearchResultRestaurant,
    emptyDataSearchResultRestaurant,
    detailDataImageRestaurant,
    detailDataDescriptionRestaurant,
    detailDataReviewsOfRestaurant,
    createLikeButtonTemplate,
    createUnlikeButtonTemplate,
    createFailToLoadData,
    createEmptyData,
};
