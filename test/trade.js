/* global it describe */
/*eslint max-len: ["error", { "code": 200 }]*/

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1Njk1MDM4NjMsImV4cCI6MTYwMTAzOTg2M30.y82iLLmIFP-ngMpls3mz4labtNLnaSOmXEQgoJWtoWI";

describe('Trade', () => {
    describe('POST /trade', () => {
        it('should get 200 HAPPY PATH with valid token', (done) => {
            let data = {
                user: "doe",
                coinIn: "pamocoin",
                amount: "1",
                coinOut: "krona",
                price: "20",
                total: "20"
            };

            chai.request(server)
                .post("/trade")
                .set('x-access-token', apiKey)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /trade', () => {
        it('should get 500 invalid token', (done) => {
            let data = {
                user: "doe",
                coinIn: "pamocoin",
                amount: "1",
                coinOut: "krona",
                price: "20",
                total: "20"
            };

            chai.request(server)
                .post("/trade")
                .set('x-access-token', "fail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
