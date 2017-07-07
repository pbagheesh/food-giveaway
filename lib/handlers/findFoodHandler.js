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

    const lat = degreeToRad(query.lat);
    const lon = degreeToRad(query.long);

    const r = query.distance/6371;  // The Radius in terms of radians , Distance is in Kilometre's

    const latT = Math.asin( Math.sin( lat )/ Math.cos( r ) )
    const delLon = Math.asin( Math.sin( r )/ Math.cos( lat ) )

    const latMin = radToDegree(lat - r);
    const latMax = radToDegree(lat + r);
    const longMin = radToDegree(lon - delLon);
    const longMax = radToDegree(lon + delLon);

    console.log(latMin + " " + latMax);


    food.query().where('lat', '>' , latMin)
    .andWhere('lat', '<', latMax)
    .andWhere('long', '>', longMin)
    .andWhere('long', '<', longMax)


    .asCallback((error, result) => {
        if (error){
            console.log(error)
            return reply(error);
        }

        console.log(result)
        reply('information entered successfully');
    });
};

function degreeToRad(angle) {
    return angle * (Math.PI / 180);
}

function radToDegree(angle) {
    return angle * (180/ Math.PI)
}
