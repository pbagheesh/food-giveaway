'use strict';

const Hoek = require('hoek');

module.exports = function (request, reply) {

    const payload = Hoek.shallow(request.payload);

    const desc = payload.desc
    const allergen = payload.allergen
    const location = payload.location
    const picture = payload.picture

    reply('information entered: '+ desc + allergen + location + picture);
};
