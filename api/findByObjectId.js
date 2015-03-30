var parseOId = require('./parseOId');

var findByObjectId = function(props) {
  this.connect(this.merge( this.props, props ), function(com){
    com.query[com.key] = parseOId(com.query[com.key]);
    var col = com.db.collection(com.name);
    col.findOne(com.query, function(err, results) {
      com.db.close();
      com.cb(err, results);
    });
  });
};

module.exports = findByObjectId;
