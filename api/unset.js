var update = require('./update');

var unset = function(o) {
  o.doc = {$unset: {}};
  o.doc.$unset[o.key] = 1;
  update(o);
};

module.exports = unset;
