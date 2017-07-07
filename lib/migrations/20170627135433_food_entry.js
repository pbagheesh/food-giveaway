
exports.up = function(knex, Promise) {
    // What does Promise do ??

    return Promise.all([
        knex.schema.createTable('food-available', (table) => {
            table.increments('id').primary();
            table.string('desc');
            table.json('allergen');  // JSON should store it as just a string
            table.float('lat');
            table.float('long');
            table.string('address');
            table.specificType('coord', 'point')
            // how should I store the image ?
        })
    ]);
};

exports.down = function(knex, Promise) {

};
