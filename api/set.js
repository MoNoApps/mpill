var update = require('./update');

var set = function(o) {
  o.doc = {$set: {}};
  o.doc.$set[o.key] = o.val;
  update(o);
};

module.exports = set;
