var connect = function(com, next) {
  var client = require('mongodb').MongoClient;

  client.connect(com.url, function(err, db) {
    com.err = err;
    com.db = db || false;

    next(com);
  });
};

module.exports = connect;
