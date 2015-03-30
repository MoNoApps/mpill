var M = require('/Users/daniel/Apps/mpill/index.js');
var util = require('util');

var callback = function(e,r) { console.log(r); };

var missing = {
  url: 'mongodb://127.0.0.1/decktools',
  name: 'users',
  cb: callback,
  query: {},
  project: {},
  options: {w: 1},
  sort: {_id: 1},
  limit: 10,
  doc: {},
  key: '_id',
  concern: {w: 1}
};

var mpill = new M(missing);
console.log(mpill.find({query: {}}));
