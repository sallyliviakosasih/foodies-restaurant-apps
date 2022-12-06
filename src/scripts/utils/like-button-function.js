import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../views/templates/template-creator';

const LikeButtonFunction = {
    async init({ likeButtonContainer, favoriteRestaurantdb, DataRestaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._DataRestaurant = DataRestaurant;
        this._favoriteRestaurantdb = favoriteRestaurantdb;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._DataRestaurant;
        if (await this._isDataRestaurantStored(id)) {
            this._renderUnlike();
        } else {
            this._renderLike();
        }
    },

    async _isDataRestaurantStored(id) {
        const DataRestaurant = await this._favoriteRestaurantdb.getRestaurant(id);
        return !!DataRestaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurantdb.updateDataRestaurant(this._DataRestaurant);
            this._renderButton();
        });
    },

    _renderUnlike() {
        this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();
        const likeButton = document.querySelector('#unlikeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurantdb.deleteRestaurant(this._DataRestaurant.id);
            this._renderButton();
        });
    },

};

export default LikeButtonFunction;
