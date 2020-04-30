'use strict';

/**
 * Delete a contact by id
 *
 * @param {object} db   The db handle
 */
function deleteContact (db) {
    return (req, res, next) => {
        // Classic case of callback hell here.
        // If this were a production app and the db lib didn't provide
        // a promise based api, i'd wrap these db methods in methods which return promises
        return db.remove({ _id: req.params.id }, (err, numberRemoved) => {
            if (err) {
                // In prod we would use a logger to log the error.
                console.log(err);
                return res.status(500).send({ message: 'Oops! Something bad happened :/' });
            }

            if (numberRemoved === 0) {
                return res.status(404).send({ message: `Contact with id "${req.params.id}" not found` });
            }

            return res.status(204).send();
        });
    }
}

module.exports = deleteContact;
