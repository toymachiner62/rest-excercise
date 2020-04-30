'use strict';

const supertest = require('supertest');
const server = require('../src/server');

describe('#deleteContact', () => {
    let request, db;

    describe('404', () => {

        before(() => {
            db = {
                remove: (query, callback) => {
                    return callback(null, 0);
                }
            }
            const app = server(db);
            request = supertest(app);
        });

        it('should return a 404 if contact not found', () => {
            return request.delete('/contacts/1234')
                .expect(404);
        });
    })

    describe('204', () => {

        before(() => {
            db = {
                remove: (query, callback) => {
                    return callback(null, { name: { first: 'Marvin', last: 'Jones' }});
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('should return a 204', () => {
            return request.delete('/contacts/1234')
                .expect(204)
        });
    });

    describe('500', () => {

        before(() => {
            db = {
                remove: (query, callback) => {
                    return callback(new Error());
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('shold return a 500 if an error occurs deleting a contact', () => {
            return request.delete('/contacts/1234')
                .expect(500);
        });
    })
})