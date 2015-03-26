var connect = require('./connect');

var createIndex = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.createIndex(o.query, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = createIndex;
