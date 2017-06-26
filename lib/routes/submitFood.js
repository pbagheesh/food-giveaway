'use strict';

const Handlers = require('../handlers');
const Joi = require('joi');


module.exports = (server, options) => {

    return [{
        method: 'POST',
        path: '/submit',
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    desc: Joi.string(),
                    allergen: Joi.array(),
                    location: Joi.number(),
                    picture: Joi.any()
                }
            }
        },
        handler: Handlers.submitFoodHandler
    }];
};
