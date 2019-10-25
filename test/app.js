/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('app', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH getting base', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('GET /', () => {
        it('404 UNHAPPY PATH invalid route', (done) => {
            chai.request(server)
                .get("/df")
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
});
