'use strict';

const { formatId } = require('../util');

/**
 * Create a new contact
 *
 * @param {object} db   The db object
 */
function createContact (db) {
    return (req, res, next) => {
        // Classic case of callback hell here.
        // If this were a production app and the db lib didn't provide
        // a promise based api, i'd wrap these db methods in methods which return promises

        // The instructions say to use `id` as a number,
        // but they also say to use nedb and that generates
        // a random string so i'm just going to use the generated string id for now
        return db.insert(req.body, (err, contact) => {
            if (err) {
                // In prod we would use a logger to log the error.
                console.log(err);
                return res.status(500).send({ message: 'Oops! Something bad happened here :/' });
            }

            contact = formatId(contact);
            return res.status(201).send(contact);
        });
    }
}

module.exports = createContact;
