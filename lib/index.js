var fs = require('fs'),
  queryController = require('./queryController'),
  importController = require('./importController');

exports.controllers = [queryController, importController];
exports.projections = [];

var dir = './projections/';
fs.readdir(, function(err, files) {
  files.forEach(function(name) {
    fs.readFile(dir + name, 'utf-8', function(err, script) {
      exports.projections.push({
        name: name,
        script: script
      });
    });
  });
});