var createIndex = function(props) {
  this.connect(this.merge( this.props, props ), function(com){
    var col = db.collection( com.name );
    col.createIndex(com.query, function(err, results) {
      com.db.close();
      com.cb(err, results);
    });
  });
};

module.exports = createIndex;
