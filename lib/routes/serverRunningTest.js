'use strict';

const Handlers = require('../handlers');

module.exports = (server, options) => {

    return [{
        method: 'GET',
        path: '/test/{testData}',
        handler: Handlers.serverWorkingHandler
    }];
};
