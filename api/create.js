var connect = require('./connect');

var count = function(o) {
  connect(o, function(err, db){
    db.createCollection(o.name, function(err, collection) {
      db.close();
      o.cb(err, collection);
    });
  });
};

module.exports = count;
