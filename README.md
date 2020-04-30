# rest-excercise
> [Tom Caflisch](http://linkedin.com/in/tomcaflisch) coding excercise

A simple REST example project with some basic CRUD operations for contacts.

The code has unit tests which mock the actual db so they are true unit tests instead of being functional tests. I could have easily used the in memory db for unit tests as well, but I chose to demonstrate my ability to use dependency injection instead.

## Usage

Install dependencies

```sh
$ npm install
```

Start server

```sh
$ npm start
```

Endpoints that exist:

```
POST http://localhost:3000/contacts
GET http://localhost:3000/contacts
GET http://localhost:3000/contacts/:id
PUT http://localhost:3000/contacts/:id
DELETE http://localhost:3000/contacts/:id
```

## Testing

```sh
$ npm test
```