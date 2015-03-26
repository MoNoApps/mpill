var update = require('./update');

var upsert = function(o) {
  o.options = { upsert: true };
  update(o);
};

module.exports = upsert;
