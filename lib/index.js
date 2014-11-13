var fs = require('fs'),
  path = require('path'),
  queryController = require('./queryController'),
  importController = require('./importController');

exports.controllers = [queryController, importController];
exports.projections = [];

var dir = path.join(__dirname, 'projections');
fs.readdir(dir, function(err, files) {
  files.forEach(function(name) {
    fs.readFile(dir + name, 'utf-8', function(err, script) {
      exports.projections.push({
        name: name,
        script: script
      });
    });
  });
});