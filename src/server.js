'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const validate = require('./middleware/validate');
const schema = require('./handlers/schema');
const fetchContacts = require('./handlers/fetchContacts');
const createContact = require('./handlers/createContact');
const getContact = require('./handlers/getContact');
const updateContact = require('./handlers/updateContact');
const deleteContact = require('./handlers/deleteContact');

/**
 * Starts the server and registers all the handlers
 *
 * @param {object} db The db to inject
 */
function server (db) {
    const app = express();
    app.use(bodyParser.json());
    const port = 3000;

    app.get('/contacts', fetchContacts(db));
    app.get('/contacts/:id', getContact(db));
    app.post('/contacts', validate(schema), createContact(db));
    app.put('/contacts/:id', validate(schema), updateContact(db));
    app.delete('/contacts/:id', deleteContact(db));

    return app;
}

module.exports = server;