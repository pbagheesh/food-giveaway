'use strict';

const Handlers = require('../handlers');
const Joi = require('joi');


module.exports = (server, options) => {

    return [{
        method: 'GET',
        path: '/findFood',
        config: {
            tags: ['api'],
            validate: {
                query: {
                    lat: Joi.number().required(),
                    long: Joi.number().required(),
                    // allergen: Joi.array().required()
                }
            }
        },
        handler: Handlers.findFoodHandler
    }];
};
