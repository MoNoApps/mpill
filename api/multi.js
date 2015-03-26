var connect = require('./connect');
var update = require('./update');

var multi = function(o) {
  o.options = { multi: true };
  update(o);
};

module.exports = multi;
