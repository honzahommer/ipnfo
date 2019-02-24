const { expect } = require('chai');
const request = require('supertest');
const server = require('../lib/server.js');

describe('ipnfo', () => {
  it('/GET 8.8.8.8', done => {
    request(server)
      .get('/8.8.8.8')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.hostname).to.be.equal('google-public-dns-a.google.com');
        done();
      });
  });

  it('/GET 8.8.8.8/hostname', done => {
    request(server)
      .get('/8.8.8.8/hostname')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.equal('google-public-dns-a.google.com');
        done();
      });
  });
});
