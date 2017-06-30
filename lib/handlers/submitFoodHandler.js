'use strict';

const Hoek = require('hoek');
const Boom = require('boom');

module.exports = function (request, reply) {
    const payload = Hoek.shallow(request.payload);
    const food = request.models().submit_food_model


    // const desc = payload.desc;
    // const allergen = payload.allergen;
    // const lat = payload.lat;
    // const long = payload.long;
    // const picture = payload.picture;

    food.query().insert({
        desc: payload.desc,
        allergen: payload.allergen,
        lat: payload.lat,
        long: payload.long
        // picture = payload.picture;
    })

    .returning('*')
    .asCallback((error, user) => {
        if (error){
            return reply(Boom.wrap(error));
        }
    });

    reply('information entered successfully');
};
