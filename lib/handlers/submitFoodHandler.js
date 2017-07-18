'use strict';

const Hoek = require('hoek');

module.exports = function (request, reply) {

    const payload = Hoek.shallow(request.payload);
    const food = request.models().submit_food_model;
    const knex = request.knex();

    food.query().insert({
        desc: payload.desc,
        allergen: payload.allergen,
        lat: payload.lat,
        long: payload.long,
        coord: knex.raw('point(' + payload.lat + ',' + payload.long + ')') //Again debating removing
        //this because I end up using a bounding box method instead of POSTgres functionalities
    })

    .returning('*')
    .asCallback((error, result) => {

        if (error){
            return reply(error);
        }
        return reply('information entered successfully');
    });
};
