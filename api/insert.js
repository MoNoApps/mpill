var connect = require('./connect');

var insert = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.insert(o.doc, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = insert;
