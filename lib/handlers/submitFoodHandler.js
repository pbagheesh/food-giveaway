'use strict';

const Hoek = require('hoek');
const Boom = require('boom');
var knex = require('knex')({
  dialect: 'postgres'
});
const PostGIS = require('knex-postgis')(knex);

module.exports = function (request, reply) {
    const payload = Hoek.shallow(request.payload);
    const food = request.models().submit_food_model;
    const knex = request.knex();

    food.query().insert({
        desc: payload.desc,
        allergen: payload.allergen,
        lat: payload.lat,
        long: payload.long,
        coord: knex.raw('point('+payload.lat+','+ payload.long+')')


// PostGIS.geomFromText('point(' + payload.lat + ' ' + payload.long +')').toString()
//         st.geomFromText('Point(0 0)', 4326)
// }).into('points').toString();

        // picture = payload.picture;
    })

    .returning('*')
    .asCallback((error, food) => {
        // Food is the data you get back from the database
        // General pattern is error, result for database ==> Error first call back

        if (error){
            console.log(error)
            return reply(error);
        }
        reply('information entered successfully');
    });
};
