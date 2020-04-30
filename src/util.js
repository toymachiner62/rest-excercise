'use strict';

/**
 * Converts a contact's _id to id
 */
function formatId (contact) {
    const newContact = Object.assign({}, contact);
    newContact.id = contact._id;
    delete newContact._id;
    return newContact;
}

module.exports = {
    formatId
}