var connect = require('./connect');
var update = require('./update');

var inc = function(o) {
  var k = o.key;
  var q = o.qty;
  o.doc = {$inc: {k: q}};
  update(o);
};

module.exports = inc;
