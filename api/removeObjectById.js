var connect = require('./connect');
var parseOId = require('./parseOId');

var removeByObjectId = function(o) {
  connect(function(err, db){
    o.query[o.key] = parseOID(o.query[o.key]);
    var col = db.collection(name);
    col.remove(o.query, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = removeByObjectId;
