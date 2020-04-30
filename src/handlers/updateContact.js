'use strict';

const { formatId } = require('../util');

/**
 * Create a new contact
 *
 * @param {object} db   The db object
 */
function updateContact (db) {
    return (req, res, next) => {
        // Classic case of callback hell here.
        // If this were a production app and the db lib didn't provide
        // a promise based api, i'd wrap these db methods in methods which return promises
        return db.update({ _id: req.params.id }, req.body, { returnUpdatedDocs: true }, (err, numberUpdated, contact) => {
            if (err) {
                // In prod we would use a logger to log the error.
                console.log(err);
                return res.status(500).send('Oops! Something bad happened here :/');
            }

            if (numberUpdated === 0) {
                return res.status(404).send({ message: `Contact with id "${req.params.id}" not found` });
            }

            contact = formatId(contact);
            return res.status(200).send(contact);
        });
    }
}

module.exports = updateContact;
