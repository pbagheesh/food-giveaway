'use strict';

exports.up = function (knex, Promise) {

    return Promise.all([
        knex.schema.createTable('food-available', (table) => {

            table.increments('id').primary();
            table.string('desc');
            table.json('allergen'); //It is a JSON object to be able to use the whereJsonNotSupersetOf Method in findFoodHandler
            table.float('lat');
            table.float('long');
            // table.string('address');  // I would still need to connect it to a google API to get the address from a lat, long
            table.specificType('coord', 'point'); //Debating removing this because I dont end up using it, because of the bounding box with lat/long method
        })
    ]);
};

exports.down = function (knex, Promise) {
    //Not sure if I should delete this or keep it
};
