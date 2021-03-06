var fs = require('fs'),
  path = require('path'),
  queryController = require('./queryController'),
  importController = require('./importController');

exports.controllers = [queryController, importController];

// TODO: make this part of a module?
exports.getProjections = function(cb) {
  var projections = [];
  var dir = path.join(__dirname, 'projections');
  fs.readdir(dir, function(err, files) {
    files.forEach(function(name) {
      var fullPath = path.join(dir, name);
      fs.readFile(fullPath, 'utf-8', function(err, script) {
        cb({
          name: name.slice(0, -3),
          projection: script
        });
      });
    });
  });
};