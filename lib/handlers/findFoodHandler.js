'use strict';

const Hoek = require('hoek');

const degreeToRad = function (angle) {
    //converts degrees to radians
    return angle * (Math.PI / 180);
};

const radToDegree = function (angle) {
    //Converts radians to degree
    return angle * (180 / Math.PI);
};

module.exports = function (request, reply) {

    const query = Hoek.shallow(request.query);
    const food = request.models().submit_food_model;

    // lat and long provided by user
    const lat = degreeToRad(query.lat);
    const lon = degreeToRad(query.long);

    const r = query.distance /  6371;  // The Radius in terms of radians , Distance is in Kilometre's

    // const latT = Math.asin( Math.sin( lat )/ Math.cos( r ) ) // Let this be commented for now
    const delLon = Math.asin(Math.sin(r) / Math.cos(lat));

    const latMin = radToDegree(lat - r);
    const latMax = radToDegree(lat + r);
    const longMin = radToDegree(lon - delLon);
    const longMax = radToDegree(lon + delLon);

    food.query().skipUndefined().where('lat', '>' , latMin)
    .andWhere('lat', '<', latMax)
    .andWhere('long', '>', longMin)
    .andWhere('long', '<', longMax)
    .where(function () {

        if (query.allergen){
            this.whereJsonNotSupersetOf('allergen',query.allergen);
        }
    })

    .asCallback((error, result) => {

        if (error){
            console.log(error);
            return reply(error);
        }

        reply(result);
    });
};
