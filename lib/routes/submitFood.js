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
                    desc: Joi.string().required(),
                    allergen: Joi.array(),
                    lat: Joi.number().required(),
                    long: Joi.number().required()
                    // picture: Joi.any().required()
                }
            }
        },
        handler: Handlers.submitFoodHandler
    }];
};
