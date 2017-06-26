'use strict';

const Hoek = require('hoek');

module.exports = function (request, reply) {
    reply('information entered: '+ request.params.testData);
};
