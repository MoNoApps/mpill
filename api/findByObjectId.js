var connect = require('./connect');
var parseOId = require('./parseOId');

var findByObjectId = function(o) {
  connect(o, function(err, db){
    o.query[o.key] = parseOId(o.query[o.key]);
    var col = db.collection(o.name);
    col.findOne(o.query || {}, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = findByObjectId;
