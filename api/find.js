var connect = require('./connect');

//query, cb, project, options, limit, sort
var find = function(o) {
  connect(o, function(err, db){
    var col = db.collection(o.name);
    col.find(o.query || {}, o.project || {}, o.options || {w: 1})
       .limit(o.limit || 10)
       .sort(o.sort || {_id: 1})
       .toArray(function(err, results) {
          db.close();
          o.cb(err, results);
    });
  });
};

module.exports = find;
