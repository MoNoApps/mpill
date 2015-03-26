var connect = function(o, next){
  var client = require('mongodb').MongoClient;

  client.connect(o.url, function(err, db){
    if(err && o.cb){
      return o.cb(err, false);
    }
    next(err, db);
  });
};

module.exports = connect;
