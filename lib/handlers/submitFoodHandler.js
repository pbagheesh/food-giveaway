'use strict';

const Hoek = require('hoek');
// const Boom = require('boom');
// var knex = require('knex')({
//   dialect: 'postgres'
// });
// const PostGIS = require('knex-postgis')(knex);

module.exports = function (request, reply) {

    const payload = Hoek.shallow(request.payload);
    const food = request.models().submit_food_model;
    const knex = request.knex();

    food.query().insert({
        desc: payload.desc,
        allergen: payload.allergen,
        lat: payload.lat,
        long: payload.long,
        coord: knex.raw('point(' + payload.lat + ',' + payload.long + ')')
    })

    .returning('*')
    .asCallback((error, result) => {

        if (error){
            return reply(error);
        }
        reply('information entered successfully');
    });
};
