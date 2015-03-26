var update = require('./update');

var set = function(o) {
  o.doc = { $set: o.add };
  update(o);
};

module.exports = set;
