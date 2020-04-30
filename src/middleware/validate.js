'use strict';

const joi = require('@hapi/joi');

/**
 * Validates that the request body is valid against the schema
 *
 * @param {object} schema The joi schema to validate `data` against
 */
function validate (schema) {
    return (req, res, next) => {
        if (!schema) {
            return res.status(500).send('"schema" is required');
        }

        if (!joi.isSchema(schema)) {
            return res.status(500).send('"schema" param is not a valid joi schema');
        }

        const { error } = schema.validate(req.body);

        if (error) {
            const allErrors = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send({ message: allErrors });
        }

        return next();
    };
}

module.exports = validate;