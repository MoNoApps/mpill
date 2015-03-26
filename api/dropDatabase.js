var connect = require('./connect');

var dropDatabase = function(o) {
  connect(function(err, db){
    db.dropDatabase(function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = dropDatabase;
