'use strict';

module.exports = function (request, reply) {

    reply('information entered: ' + request.params.testData);
};
