'use strict';

const { formatId } = require('../util');

/**
 * Fetch all contacts
 *
 * @param {object} db   The db object
 */
function fetchContacts (db){
    return (req, res, next) => {
        // Classic case of callback hell here.
        // If this were a production app and the db lib didn't provide
        // a promise based api, i'd wrap these db methods in methods which return promises
        return db.find({}, (err, contacts) => {
            if (err) {
                // If prod i'd use an actual logger here
                console.log(err);
                res.status(500).send({ message: 'Oops! Something bad happened here :/' })
            }

            // Format all the contacts id's
            contacts = contacts.map(contact => {
                contact = formatId(contact);
                return contact;
            });

            return res.send(contacts);
        })
    }
}

module.exports = fetchContacts;