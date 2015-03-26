var connect = require('./connect');
var update = require('./update');

var set = function(o) {
  var k = o.key;
  var v = o.val;
  o.doc = {$set: {k: v}};
  update(o);
};

module.exports = set;
