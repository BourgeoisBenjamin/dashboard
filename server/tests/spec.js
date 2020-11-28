let chai = require('chai')
let chaiHttp = require('chai-http');
const pool = require('../services/postgresql');


chai.use(chaiHttp);

describe('loading express server', function () {
    var server;
    before(async function () {
        server = require('./../server.test');
        await pool.getPool().query('TRUNCATE users CASCADE')
    });
    after(function () {
        server.close();
    });
    it('test server', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                chai.expect(res.body.message).to.equal('Hello world !!')
                done();
            });
    });
});

describe('register a user', function () {
    var server;
    before(async function () {
        server = require('./../server.test');
        await pool.getPool().query('TRUNCATE users CASCADE')
    });
    after(function () {
        server.close();
    });
    it('register user', (done) => {

        chai.request(server)
            .post('/account/register')
            .send({username: 'benjaminbourgeois', password: 'test', email: 'benjishift@gmail.com'})
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                done();
            });
    });
});

describe('register existing user', function () {

    var server;

    before(async function () {
        server = require('./../server.test');
        await pool.getPool().query('TRUNCATE users CASCADE')
    });
    after(function () {
        server.close();
    });
    it('register existing user', (done) => {

        chai.request(server)
            .post('/account/register')
            .send({username: 'benjaminbourgeois', password: 'test', email: 'benjishift@gmail.com'})
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
            });
        chai.request(server)
            .post('/account/register')
            .send({username: 'benjaminbourgeois', password: 'test', email: 'benjishift@gmail.com'})
            .end((err, res) => {
                chai.expect(res).to.have.status(409)
                done();
            });

    });
});

describe('login', function () {

    var server;

    before(async function () {
        server = require('./../server.test');
        await pool.getPool().query('TRUNCATE users CASCADE')
    });
    after(function () {
        server.close();
    });
    it('register a user', (done) => {

        chai.request(server)
            .post('/account/register')
            .send({username: 'benjaminbourgeois', password: 'test', email: 'benjishift@gmail.com'})
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                done()
            });

    });
    it('login a user', (done) => {

        chai.request(server)
            .post('/account/login')
            .send({identifier: 'benjishift@gmail.com', password: 'test'})
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                done();
            });

    });
});