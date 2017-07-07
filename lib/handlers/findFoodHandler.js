'use strict';

const Hoek = require('hoek');
const Boom = require('boom');

var knex = require('knex')({
  dialect: 'postgres'
});
const PostGIS = require('knex-postgis')(knex);

module.exports = function (request, reply) {
    const query = Hoek.shallow(request.query);
    const food = request.models().submit_food_model;

    const knex = request.knex();

    var r = 

    food.query()


    .asCallback((error, result) => {
        if (error){
            console.log(error)
            return reply(error);
        }

        console.log(result)
        reply('information entered successfully');
    });
};
