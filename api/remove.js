var connect = require('./connect');

var remove = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.remove(o.query, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = remove;
