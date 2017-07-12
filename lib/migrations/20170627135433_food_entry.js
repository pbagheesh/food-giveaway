'use strict';

exports.up = function (knex, Promise) {

    return Promise.all([
        knex.schema.createTable('food-available', (table) => {

            table.increments('id').primary();
            table.string('desc');
            table.json('allergen');
            table.float('lat');
            table.float('long');
            table.string('address');
            table.specificType('coord', 'point');
        })
    ]);
};

exports.down = function (knex, Promise) {
    //Not sure if I should delete this or keep it
};
