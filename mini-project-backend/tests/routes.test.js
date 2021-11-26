// Import in chai modules
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Link our index file
const server = require('../server.js');

//Link my Beer model
const { Beer } = require('../persistence/schema.js');

chai.use(chaiHttp);

describe('Testing Beer routes', function () {
  const testBeer = { name: 'testBeer', description: 'lovely beer', abv: 4, alcohol_free: false, type: 'beer' };
  const testBeer2 = { name: 'testBeer2', description: 'lovely beer2', abv: 4, alcohol_free: false, type: 'beer' };
  const testBeer3 = new Beer({
    "name": "testBeer3",
    "description": "nice",
    "abv": 7,
    "alcohol_free" : false,
    "type": "beer"
  });

  let id;

  before(function (done) {
    testBeer3.save().then((result) => {
      id = result._id.toString();
      console.log(id);
      done();
    });
  });

  it('testing the /create route', function (done) {
    chai
      .request(server)
      .post('/beer/create')
      .send(testBeer)
      .end((err, res) => {
        if (err) {
          console.log('error detected');
          done(err);
        }
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.text).to.be.a('string');
        expect(res.text).to.be.equal(`Created Beer : ${testBeer.name}`);
        done();
      });
  });

  it('Testing the getAll Route', function (done) {
    // Arrange
    chai
      .request(server)
      .get('/beer/getAll')
      .end((err, res) => {
        if (err) {
          console.log('error detected');
          done(err);
        }
        //Assertion
        const body = res.body;
        expect(res).to.have.status(206);
        expect(body).to.not.be.null;

        // Map through the body (which is an array) and check the values
        body.map((Beer) => {
          expect(Beer).to.contain.keys('name');
          expect(Beer).to.be.a('Object');
        });
        done();
      });
  });

  it('Testing delete route', function (done) {
    chai
      .request(server)
      .delete(`/beer/delete/${id}`)
      .end((err, res) => {
        if (err) {
          console.log('error detected');
          done(err);
        }
        expect(res).to.have.status(202);
          expect(res.text).to.be.equal(`Deleted`);
          done();
      });
  });

  // will clear all of the data after all the tests run.
  after(function (done) {
    Beer.deleteOne({ name: 'testBeer' }).then(() => {
      done();
    });
  });
});
