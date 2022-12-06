/* eslint-disable max-len */

/*
  Skenario Pengguna Untuk Fungsi Like
  ===================================
  1.  PENGGUNA MELAKUKAN LIKE TERHADAP RESTAURANT
      a.  Menampilkan tombol like pada halaman detail
      b.  Pengguna menekan tombol Like
          i.  Data Restaurant disimpan pada daftar Restaurant yang disukai pengguna
          ii. Jika data sudah ada pada daftar restaurant,
              - Tidak perlu disimpan lagi pada daftar restaurant
          iii.Jika data restaurant tidak memiliki id,
              - Data restaurant tidak disimpan pada daftar dan sistem tidak error

  2.  PENGGUNA MELAKUKAN UNLIKE TERHADAP RESTAURANT
      a.  Menampilkan tombol unlike pada halaman detail
      b.  Pengguna menekan tombol unlike
          i.  Data restaurant dihapus dari daftar Restaurant yang disukai pengguna (indexedDb)
          ii.  Jika data tidak ada pada daftar favorite restaurant (indexedDb),
                - Tidak ada data yang dihapus dan sistem tidak error
*/

import FavoriteRestaurantsIdb from '../src/scripts/data/favorite-restaurants-idb';
import * as testingFactories from './helper/integrationTestingFactories';

/* eslint-disable no-undef */
describe('Like Function of Restaurant :', () => {
  const renderLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  describe('Liking a Restaurant', () => {
    beforeEach(() => {
      renderLikeButtonContainer();
    });

    afterEach(async () => {
      await FavoriteRestaurantsIdb.deleteRestaurant(1);
    });

    it('should show like button when the restaurant has not been liked before', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      expect(document.querySelector('[aria-label="Like the restaurant"]')).toBeTruthy();
    });

    it('should hide the unlike button when the restaurant has not been liked before', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      expect(document.querySelector('[aria-label="Unlike the restaurant"]')).toBeFalsy();
    });

    it('should be able to save the data of restaurants to the favorite database (indexeddb) when restaurant is liked', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });

      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      const restaurant = await FavoriteRestaurantsIdb.getRestaurant(1);
      expect(restaurant).toEqual({ id: 1 });
    });

    it('should not save the data of restaurant when the data has been save or stored before in favorite list (indexedDb) ', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      await FavoriteRestaurantsIdb.updateDataRestaurant({ id: 1 });
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    });

    it('should not save the data of the restaurant when the data does not have id', async () => {
      await testingFactories.renderLikeButtonPresenter([{ id: 1 }]);
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
    });
  });

  describe('Unlike a Restaurant', () => {
    beforeEach(async () => {
      renderLikeButtonContainer();
      await FavoriteRestaurantsIdb.updateDataRestaurant({ id: 1 });
    });
    afterEach(async () => {
      await FavoriteRestaurantsIdb.deleteRestaurant(1);
    });

    it('should show unlike widget when the restaurant has been liked', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      expect(document.querySelector('[aria-label="Unlike the restaurant"]')).toBeTruthy();
    });

    it('should remove the restaurant data from the favorite restaurant list when the restaurant is unliked (unlike widget is clicked)', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      document.querySelector('#unlikeButton').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
    });

    it('should not cause error when the unliked restaurant is not in the favorite restaurant list', async () => {
      await testingFactories.renderLikeButtonPresenter({ id: 1 });
      await FavoriteRestaurantsIdb.deleteRestaurant(1);
      document.querySelector('#unlikeButton').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
    });
  });
});
