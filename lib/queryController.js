(function(controller) {
  var gitHubEventsToApiResponse = require('./translators/gitHubEventsToApiResponse'),
    EventStore = require('eventstore-client');


  controller.init = function(app, config) {
    /**
     * @api {get} /api/query Request commits
     * @apiName query
     * @apiGroup Query
     *
     * @apiParam {String} workitem VersionOne workitem identifier
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String}	commitDate Original commit date
     * @apiSuccess {String} timeFormatted Time the commit was made, relative to now
     * @apiSuccess {String} author Commit author's name
     * @apiSuccess {String}	sha1Partial First 6 characters of the commit's SHA1 hash
     * @apiSuccess {String} action The original action that produced the commit, such as "commited"
     * @apiSuccess {String} message Original commit message sent to the VCS
     * @apiSuccess {String} commitHref Link to an HTML page to view the commit in the source VCS
     */
    app.get("/api/query", function(req, res) {
      var es = new EventStore({
        baseUrl: config.eventStoreBaseUrl,
        username: config.eventStoreUser,
        password: config.eventStorePassword
      });

      var stream = 'asset-' + req.query.workitem;
      var count = req.query.pageSize || 5;

      es.stream.get({
        name: stream,
        count: count
      }, function(error, response) {
        var result = {
          commits: []
        }

        if (response.body) {
          var obj = JSON.parse(response.body);
          result = gitHubEventsToApiResponse(obj.entries);
        }

        res.set("Content-Type", "application/json");
        res.send(result);
      });

    });
  };
})(module.exports);