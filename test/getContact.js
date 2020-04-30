'use strict';

const supertest = require('supertest');
const server = require('../src/server');

describe('#getContact', () => {
    let request, db;

    describe('404', () => {

        before(() => {
            db = {
                findOne: (query, callback) => {
                    return callback(null, null);
                }
            }
            const app = server(db);
            request = supertest(app);
        });

        it('should return a 404 if contact not found', () => {
            return request.get('/contacts/1234')
                .expect(404);
        });
    })

    describe('200', () => {

        before(() => {
            db = {
                findOne: (query, callback) => {
                    return callback(null, { name: { first: 'Marvin', last: 'Jones' }});
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('should return a 200 with the contact', () => {
            return request.get('/contacts/1234')
                .expect(200)
        });
    });

    describe('500', () => {

        before(() => {
            db = {
                findOne: (query, callback) => {
                    return callback(new Error());
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('shold return a 500 if an error occurs finding a contact', () => {
            return request.get('/contacts/1234')
                .expect(500);
        });
    })
})