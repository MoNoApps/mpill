var connect = require('./connect');

var drop = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.drop(o.query, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = drop;
