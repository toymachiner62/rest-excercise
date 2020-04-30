'use strict';

const { formatId } = require('../util');

/**
 * Get a contact by id
 *
 * @param {object} db   The db object
 */
function getContact (db) {
    return (req, res, next) => {
        // Classic case of callback hell here.
        // If this were a production app and the db lib didn't provide
        // a promise based api, i'd wrap these db methods in methods which return promises
        return db.findOne({ _id: req.params.id }, (err, contact) => {
            if (err) {
                // In prod we would use a logger to log the error.
                console.log(err);
                return res.status(500).send({ message: 'Oops! Something bad happened here :/' });
            }

            if (!contact) {
                return res.status(404).send({ message: `Contact with id "${req.params.id}" not found` });
            }

            contact = formatId(contact);
            return res.status(200).send(contact);
        });
    }
}

module.exports = getContact;
