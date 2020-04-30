'use strict';

const joi = require('@hapi/joi');

const schema = joi.object().required().keys({
    name: joi.object().required().keys({
        first: joi.string().required(),
        middle: joi.string().optional(),
        last: joi.string().required()
    }),
    address: joi.object().optional().keys({
        street: joi.string().optional(),
        city: joi.string().optional(),
        state: joi.string().optional(),
        zip: joi.string().optional(),
    }),
    phone: joi.array().items(
        joi.object().required().keys({
            number: joi.string().required(),
            type: joi.allow('home', 'work', 'mobile')
        })
    ),
    email: joi.string().optional()
})

module.exports = schema;