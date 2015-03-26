var connect = require('./connect');
var update = require('./update');

var set = function(o) {
  var k = o.key;
  o.doc = { $unset: {k: 1} };
  update(o);
};

module.exports = set;
