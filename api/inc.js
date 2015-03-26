var update = require('./update');

var inc = function(o) {
  o.doc = {$inc: {}};
  o.doc.$inc[o.key] = o.qty;
  update(o);
};

module.exports = inc;
