const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/server.js');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('ipnfo', () => {
  describe('/GET 8.8.8.8', done => {
    it('it should GET 8.8.8.8 GeoIP records', () => {
      chai.request(server)
        .get('/8.8.8.8')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('hostname').eql('google-public-dns-a.google.com');

          return done();
        });
    });
  });

  describe('/GET 8.8.8.8/hostname', done => {
    it('it should GET 8.8.8.8 GeoIP hostname', () => {
      chai.request(server)
        .get('/8.8.8.8/hostname')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql('"google-public-dns-a.google.com"');

          return done();
        });
    });
  });
});
