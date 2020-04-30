'use strict';

const supertest = require('supertest');
const server = require('../src/server');

describe('#createContact', () => {
    let request, db;

    describe('200', () => {

        before(() => {
            db = {
                insert: (query, callback) => {
                    return callback(null, { name: { first: 'Marvin', last: 'Jones' }});
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('should return a 200 with the contact', () => {
            return request.post('/contacts')
                .send({
                    name: {
                        first: 'Marvin',
                        last: 'Jones'
                    }
                })
                .expect(201)
        });
    });

    describe('400', () => {

        before(() => {
            db = {
                insert: (query, callback) => {
                    return callback(null, { name: { first: 'Marvin', last: 'Jones' }});
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('should return a 400 if no body', () => {
            return request.post('/contacts')
                .send({
                    name: {}
                })
                .expect(400)
        });

        it('should return a 400 if no first name', () => {
            return request.post('/contacts')
                .send({
                    name: {
                        last: 'Jones'
                    }
                })
                .expect(400)
        });

        it('should return a 400 if no last name', () => {
            return request.post('/contacts')
                .send({
                    name: {
                        first: 'Marvin'
                    }
                })
                .expect(400)
        });
    });

    describe('500', () => {

        before(() => {
            db = {
                insert: (query, callback) => {
                    return callback(new Error());
                }
            }
            const app = server(db);
            request = supertest(app);
        })

        it('shold return a 500 if an error occurs finding a contact', () => {
            return request.post('/contacts')
                .send({
                    name: {
                        first: 'Marvin',
                        last: 'Jones'
                    }
                })
                .expect(500);
        });
    })
})