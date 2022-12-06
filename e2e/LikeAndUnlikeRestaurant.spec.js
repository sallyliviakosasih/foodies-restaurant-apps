/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Like and Unlike Restaurant');
Before(({ I }) => {
    I.amOnPage('/#/favorites');
});

Scenario('Showing an empty Favorite Page with complete components when no restaurant is liked', ({ I }) => {
    /*
        SKENARIO MENAMPILKAN HALAMAN FAVORITE KOSONG
        ============================================
        1.  Pengguna Mengunjungi Halaman Favorite
        2.  Menampilkan Header
        3.  Menampilkan Data Container yang berisi Instruksi "Tidak ada Data yang ditampilkan"
        4.  Menampilkan Footer
    */
    I.seeElement('header');
    I.see('No Data Could be Displayed', '.empty_data_container');
    I.seeElement('.footer');
});

Scenario('Liking a restaurant and show it on favorite page', async ({ I }) => {
    /*
        SKENARIO MENYUKAI RESTAURANT
        ============================
        1.  Menampilkan seluruh data restaurant pada halaman utama (homepage)
        2.  Pengguna menekan tombol "See More detail" untuk melakukan like pada restaurant
        3.  Pengguna menekan widget Like pada halaman detail restaurant
        4.  Data Restaurant tersimpan pada halaman favorite
    */
    I.see('No Data Could be Displayed', '.empty_data_container');
    I.amOnPage('/');
    const theRestaurant = locate('.restaurant-name').first();
    const firstRestaurantName = await I.grabTextFrom(theRestaurant);
    I.seeElement('.more-detail-button');
    I.click(locate('.more-detail-button').first());

    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorites');
    const likedRestaurantName = await I.grabTextFrom('.restaurant-name');
    assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('Liking some movies and show them in favorite page', async ({ I }) => {
    /*
        SKENARIO MENAMPILKAN BERBERAPA RESTAURANT YANG DISUKAI PENGGUNA
        ================================================================
        1.  Pengguna mengunjungi halaman favorite yang masih kosong
        2.  Menampilkan tidak ada data restaurant yang dapat ditampilkan
        3.  Pengguna mengunjungi halaman utama (homepage)
        4.  Menampilkan halaman homepage yang berisi data-data restaurant
        5.  Pengguna menekan tombol "See More Detail" untuk menyukai restaurant
        6.  Pengguna kembali ke Halaman utama (homepage) untuk menyukai restaurant lain
        7.  Pengguna mengunjungi halaman Favorite
        8.  Menampilkan data restaurant yang sesuai dengan restaurant yang disukai pengguna
            -   Memastikan jumlah data yang ditampilkan sesuai
            -   Memastikan data yang ditampilkan sesuai
    */

        I.see('No Data Could be Displayed', '.empty_data_container');
        I.amOnPage('/');
        I.seeElement('.more-detail-button');
        const restaurants = [];
        for (let i = 1; i <= 3; i++) {
            I.click(locate('.more-detail-button').at(i));
            I.waitForElement('#likeButton');
            I.seeElement('#likeButton');
            restaurants.push(await I.grabTextFrom('#restaurant_title'));
            I.click('#likeButton');
            I.amOnPage('/');
        }
        restaurants.sort();
        I.amOnPage('/#/favorites');
        const likedRestaurants = [];
        const numberOfRestaurants = await I.grabNumberOfVisibleElements('.data-restaurant');
        assert.strictEqual(numberOfRestaurants, restaurants.length);

        for (let i = 1; i <= numberOfRestaurants; i++) {
            likedRestaurants.push(await I.grabTextFrom(locate('.restaurant-name').at(i)));
        }
        likedRestaurants.sort();
        assert.deepEqual(likedRestaurants, restaurants);
});

Scenario('Displaying Unlike Widget after Restaurant is liked', ({ I }) => {
    /*
        SKENARIO PENGGUNA MELAKUKAN UNLIKE TERHADAP SUATU RESTAURANT
        ============================================================
        1.  Pengguna mengunjungi halaman favorite yang masih kosong
        2.  Menampilkan tidak ada data restaurant yang dapat ditampilkan
        3.  Pengguna mengunjungi halaman utama (homepage)
        4.  Menampilkan halaman homepage yang berisi data-data restaurant
        5.  Pengguna menekan tombol "See More Detail" untuk menyukai restaurant
        6.  Menampilkan tombol unlike (unlike widget) setelah menyukai restaurant
    */

    I.see('No Data Could be Displayed', '.empty_data_container');
    I.amOnPage('/');
    I.seeElement('.more-detail-button');
    I.click(locate('.more-detail-button').first());
    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.seeElement('#unlikeButton');
});

Scenario('Re-displaying like widget after unlike button is clicked', ({ I }) => {
    /*
        SKENARIO PENGGUNA MELAKUKAN LIKE KEMBALI TERHADAP SUATU RESTAURANT SETELAH UNLIKE RESTAURANT
        ====================================================================================
        1.  Pengguna mengunjungi halaman favorite yang masih kosong
            - Menampilkan tidak ada data restaurant yang dapat ditampilkan
        2.  Pengguna mengunjungi halaman utama (homepage)
            - Menampilkan halaman homepage yang berisi data-data restaurant
        3.  Pengguna menekan tombol "See More Detail"
            - Menampilkan widget like
        4.  Pengguna menekan tombol like
            - Menampilkan tombol unlike (unlike widget)
        7.  Pengguna menekan tombol unlike
            - Menampilkan widget like kembali
    */

        I.see('No Data Could be Displayed', '.empty_data_container');
        I.amOnPage('/');
        I.seeElement('.more-detail-button');
        I.click(locate('.more-detail-button').first());

        I.waitForElement('#likeButton');
        I.seeElement('#likeButton');

        I.click('#likeButton');
        I.seeElement('#unlikeButton');

        I.click('#unlikeButton');
        I.seeElement('#likeButton');
});

Scenario('Delete a restaurant from favorite page after the restaurant is unliked', ({ I }) => {
    /*
        SKENARIO PENGGUNA MELAKUKAN LIKE KEMBALI TERHADAP SUATU RESTAURANT SETELAH UNLIKE RESTAURANT
        ====================================================================================
        1.  Pengguna mengunjungi halaman favorite yang masih kosong
            - Menampilkan tidak ada data restaurant yang dapat ditampilkan
        2.  Pengguna mengunjungi halaman utama (homepage)
            - Menampilkan halaman homepage yang berisi data-data restaurant
        3.  Pengguna menekan tombol "See More Detail"
            - Menampilkan widget like
        4.  Pengguna menekan tombol like (like widget)
        5.  Pengguna mengunjungi halaman favorite
            - Menampilkan data restaurant yang telah dilike
        6.  Pengguna menekan tombol "See More detail" pada halaman favorite
            - Menampilkan data detail restaurant
            - Menampilkan widget unlike (tombol unlike)
        7.  Pengguna menekan tombol unlike
        8. Pengguna mengunjugi halaman favorite
            - Data restaurant yang diunlike telah dihapus dari halaman favorite
    */
    I.see('No Data Could be Displayed', '.empty_data_container');

    I.amOnPage('/');
    I.seeElement('.more-detail-button');
    I.click(locate('.more-detail-button').first());

    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorites');
    I.seeElement('.data-restaurant');
    I.click('.more-detail-button');

    I.waitForElement('#unlikeButton');
    I.seeElement('#unlikeButton');
    I.click('#unlikeButton');

    I.amOnPage('/#/favorites');
    I.see('No Data Could be Displayed', '.empty_data_container');
});

Scenario('Unlike some of restaurants and delete them from the lists of favorited restaurant in favorite page', async ({ I }) => {
    /*  SKeNARIO MELAKUKAN UNLIKE TERHADAP BERBERAPA RESTAURANT YANG BERADA DI HALAMAN FAVORITE
        =======================================================================================
        1.  Pengguna mengunjungi halaman favorite yang masih kosong
            - Menampilkan tidak ada data restaurant yang dapat ditampilkan
        2.  Pengguna mengunjungi halaman utama (homepage)
            - Menampilkan halaman homepage yang berisi data-data restaurant
        3.  Pengguna menekan tombol "See More Detail"
            - Menampilkan widget like
        4.  Pengguna menekan tombol like pada halaman detail restaurant
        5.  Pengguna kembali ke Halaman utama (homepage) untuk menyukai restaurant lain
        6.  Pengguna mengunjungi halaman Favorite
            - Menampilkan data-data restaurant yang telah dilike
        7.  Pengguna menekan tombol "See More Detail" pada halaman favorite
            - Menampilkan widget unlike
        8.  Pengguna kembali ke halaman favorite
            - Data Restaurant yang diunlike telah dihapus dari halaman favorite
            - Menampilkan sisa data restaurant yang dilike pengguna
    */
    I.see('No Data Could be Displayed', '.empty_data_container');
    I.amOnPage('/');
    I.waitForElement('.more-detail-button');
    I.seeElement('.more-detail-button');
    for (let i = 1; i <= 3; i++) {
        I.click(locate('.more-detail-button').at(i));
        I.waitForElement('#likeButton');
        I.seeElement('#likeButton');
        I.click('#likeButton');
        I.amOnPage('/');
    }
    I.amOnPage('/#/favorites');
    I.seeElement('.data-restaurant');
    const likedRestaurants = await I.grabNumberOfVisibleElements('.data-restaurant');
    for (let i = 1; i <= likedRestaurants - 1; i++) {
        I.click(locate('.more-detail-button').at(i));
        const theRestaurantName = await I.grabTextFrom('#restaurant_title');
        I.seeElement('#unlikeButton');
        I.click('#unlikeButton');
        I.amOnPage('/#/favorites');
        I.dontSee(theRestaurantName, '.restaurant-name');
    }
});
