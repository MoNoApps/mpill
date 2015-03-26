var connect = require('./connect');

var findOne = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.findOne(o.query || {}, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = findOne;
