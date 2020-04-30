'use strict';

const supertest = require('supertest');
const server = require('../src/server');

describe('#getContact', () => {
    let request, db;

    describe('404', () => {

        before(() => {
            db = {
                update: (query, update, options, callback) => {
                    return callback(null, 0, null);
                }
            }
            const app = server(db);
            request = supertest(app);
        });

        it('should return a 404 if contact not found', () => {
            return request.put('/contacts/1234')
                .send({
                    name: {
                        first: 'Gary',
                        last: 'Miller'
                    }
                })
                .expect(404);
        });
    })

    describe('200', () => {

        before(() => {
            db = {
                update: (query, update, options, callback) => {
                    return callback(null, 1, { name: { first: 'Marvin', last: 'Jones' }});
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('should return a 200 with the updated contact', () => {
            return request.put('/contacts/1234')
                .send({
                    name: {
                        first: 'Gary',
                        last: 'Miller'
                    }
                })
                .expect(200)
        });
    });

    describe('500', () => {

        before(() => {
            db = {
                update: (query, update, options, callback) => {
                    return callback(new Error());
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('shold return a 500 if an error occurs updating a contact', () => {
            return request.put('/contacts/1234')
                .send({
                    name: {
                        first: 'Gary',
                        last: 'Miller'
                    }
                })
                .expect(500);
        });
    })
})