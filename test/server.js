var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('GeoIP', function () {
  describe('/GET 8.8.8.8', function () {
    it('it should GET 8.8.8.8 records', function (done) {
      chai.request(server)
        .get('/8.8.8.8')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('city').eql('Mountain View');
          done();
        });
    });
  });

  describe('/GET 8.8.8.8/hostname', function () {
    it('it should GET 8.8.8.8 hostname', function (done) {
      chai.request(server)
        .get('/8.8.8.8/hostname')
        .end(function (err, res) {
          res.should.have.status(200);
          res.text.should.eql('google-public-dns-a.google.com');
          done();
        });
    });
  });

  describe('/GET 8.8.8.8/org', function () {
    it('it should GET 8.8.8.8 org from whois', function (done) {
      chai.request(server)
        .get('/8.8.8.8/org')
        .end(function (err, res) {
          res.should.have.status(200);
          res.text.should.eql('Google Inc.');
          done();
        });
    });
  });
});
