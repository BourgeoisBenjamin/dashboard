let chai = require('chai')
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('loading express server', function () {
    var server;
    beforeEach(function () {
        server = require('./../server.test');
    });
    afterEach(function () {
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