'use strict';

const DataStore = require('nedb');
const server = require('./src/server');

// Setup db and pass to server
const db = new DataStore();
const app = server(db);

app.listen(port, () => {
    console.log(`Listing on port ${port}`);
});