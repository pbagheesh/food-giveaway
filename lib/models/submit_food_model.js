'use strict';

const Model = require('schwifty').Model;
const Joi = require('joi');

module.exports = class submit_food_model extends Model {

    static get tableName() {return 'food-available'; }
    static get joiSchema() {
        return Joi.object({
            id: Joi.number(),
            desc: Joi.string(),
            allergen: Joi.array().allow(null),
            lat: Joi.number(),
            long: Joi.number(),
            coord: Joi.any()
        //  picture: Joi.    .allow(null)
        })
    }

}
