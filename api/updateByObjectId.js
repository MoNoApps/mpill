var connect = require('./connect');
var parseOId = require('./parseOId');

//query, doc, key, concern, cb
var updateByObjectId = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    if (!o.query || !o.doc || !o.key){
      return o.cb( {code: 'MissingParam', message: 'Query, Doc and Key are required.'});
    }

    o.query[o.key] = parseOId(o.query[o.key]);

    col.update(o.query, o.doc, o.concern || {w: 1}, function(err, results) {
      db.close();
      o.cb(err, results);
    });
  });
};

module.exports = updateByObjectId;
