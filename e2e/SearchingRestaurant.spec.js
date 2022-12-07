/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Searching Data of Restaurant');
Before(({ I }) => {
    I.amOnPage('/');
});
/*
    SKENARIO PENCARIAN DATA RESTAURANT DI HALAMAN UTAMA
    ===================================================
    1.  Pengguna mengunjungi halaman utama (homepage)
        - Menampilkan kolumn pencarian di halaman utama
            - Menampilkan kolumn input pencarian
            - Menampilkan elemen kolumn hasil pencarian yang masih kosong
        - Menampung seluruh data restaurant yang ada dihalaman utama
    2.  Pengguna menambahkan pencarian pada kolumn input pencarian
    3.  Pengguna menekan tombol pencarian
        - Menampilkan hasil pencarian pada kolum hasil pencarian
            - Hasil pencarian berdasarkan data restaurant pada halaman utama yang telah ditampung
            - Menyesuaikan jumlah data yang ditampilkan pada kolum hasil pencarian dengan jumlah data yang ditemukan
            - Menyesuaikan Nama Restaurant yang ditampilkan pada kolum hasil pencarian dengan data restaurant yang tersimpan
*/
Scenario('showing the data of restaurant searched', async ({ I }) => {
    I.seeElement('.search-column');
    I.seeElement('.results-column');
    I.seeElement('#search-input');
    const amountOfData = await I.grabNumberOfVisibleElements('.data-restaurant');
    const restaurants = [];
    for (let i = 1; i <= amountOfData; i++) {
        restaurants.push(await I.grabTextFrom(locate('.restaurant-name').at(i)));
    }
    const searchedRestaurant = 'Melting';
    I.fillField('#search-input', searchedRestaurant);
    I.click('#search-button');
    I.waitForElement('.result');
    const searchResult = restaurants.filter((name) => name.indexOf(searchedRestaurant) !== -1);
    const visibleResult = await I.grabNumberOfVisibleElements('.result');
    assert.strictEqual(searchResult.length, visibleResult);
    if (visibleResult > 0) {
        searchResult.forEach(async (restaurantName, index) => {
            const resultRestaurant = await I.grabTextFrom(locate('.restaurant-result-name').at(index + 1));
            assert.strictEqual(restaurantName, resultRestaurant);
        });
    }
});
