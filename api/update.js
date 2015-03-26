var connect = require('./connect');

// query, doc, concern, cb
var update = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.update(o.query, o.doc, o.concern || {w: 1}, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = update;
