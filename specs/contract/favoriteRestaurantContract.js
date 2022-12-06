/* eslint-disable max-len */
/* eslint-disable no-undef */
/*
    SKENARIO UNTUK MENAMPILKAN DATA RESTAURANT FAVORITE
    ===================================================
    1.  Menampilkan data Restaurant yang tersimpan pada indexedDb berdasarkan id tertentu
    2.  Jika id yang akan ditampilkan tidak tersimpan
        - Tidak mengakibatkan sistem gagal
    3.  Menampilkan seluruh data Restaurant favorite yang tersimpan pada indexedDb
    4.  Jika data restaurant yang tidak memiliki properti yang sesuai
        -   Tidak dapat ditambahkan pada list favorite restaurant (indexedDb)
        -   Tidak mengakibatkan sistem gagal atau berhenti
    5.  Dapat Menghapus data restaurant dari list favorite ketika restaurant di unliked oleh pengguna
    6.  Jika Data restaurant tidak ada di list favorite
        -   Tidak mengakibatkan sistem gagal atau berhenti
*/

const FavoriteRestaurantModel = (favoritedRestaurant) => {
    describe('List of Favorite Restaurant :', () => {
        it('Should show the data of restaurant stored in the favorite list without causing an error', async () => {
            favoritedRestaurant.updateDataRestaurant({ id: 1 });
            favoritedRestaurant.updateDataRestaurant({ id: 2 });
            expect(await favoritedRestaurant.getRestaurant(1)).toEqual({ id: 1 });
            expect(await favoritedRestaurant.getRestaurant(2)).toEqual({ id: 2 });
            expect(await favoritedRestaurant.getRestaurant(3)).toEqual(undefined);
        });

        it('Should show all data of restaurant stored in the favorite list', async () => {
            favoritedRestaurant.updateDataRestaurant({ id: 1 });
            favoritedRestaurant.updateDataRestaurant({ id: 2 });
            expect(await favoritedRestaurant.getAllRestaurants()).toEqual([
                { id: 1 },
                { id: 2 },
            ]);
        });

        it('Should not add the data of restaurant which does not contain required property', async () => {
            favoritedRestaurant.updateDataRestaurant({ someProperty: 'someProperty' });
            expect(await favoritedRestaurant.getAllRestaurants()).toEqual([]);
        });

        it('should delete the data restaurant from the favorite list when the restaurant is unliked', async () => {
            favoritedRestaurant.updateDataRestaurant({ id: 1 });
            favoritedRestaurant.updateDataRestaurant({ id: 2 });
            favoritedRestaurant.updateDataRestaurant({ id: 3 });

            await favoritedRestaurant.deleteRestaurant(1);
            expect(await favoritedRestaurant.getAllRestaurants()).toEqual([
                { id: 2 },
                { id: 3 },
            ]);
        });

        it('should not cause an error even the deleted restaurant does not in the favorite list of restaurant', async () => {
            favoritedRestaurant.updateDataRestaurant({ id: 1 });
            favoritedRestaurant.updateDataRestaurant({ id: 2 });
            favoritedRestaurant.updateDataRestaurant({ id: 3 });

            await favoritedRestaurant.deleteRestaurant(4);
            expect(await favoritedRestaurant.getAllRestaurants()).toEqual([
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]);
        });
    });
};
export default FavoriteRestaurantModel;
