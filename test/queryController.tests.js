// test/queryController.tests.js
var assert = require('assert'),
  express = require('express'),
  app = express(),
  request = require('supertest'),
  proxyquire = require('proxyquire'),
  eventStoreStub = {},
  controller = proxyquire('../lib/queryController', {
    'eventStore': eventStoreStub
  });

var configStub = {
  eventStoreBaseUrl: '',
  eventStoreUser: '',
  eventStorePassword: ''
}

controller.init(app, configStub);

describe('queryController', function() {
  describe('when I issue a workitem query for an asset that has no associated commits', function() {
    eventStoreStub.getLastAssets = function(args, callback) {
      callback(null, undefined);
    };

    it('returns a 200 OK response with an empty commits array', function(done) {
      //exercise our api
      request(app)
        .get('/api/query?workitem=123&pageSize=5')
        .end(function(err, res) {
          assert.equal(err, null);
          assert.equal(res.statusCode, 200);
          assert.deepEqual(res.body.commits, []);
          done();
        });
    });
  });
});