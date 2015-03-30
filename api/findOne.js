var findOne = function(props) {
  this.connect(this.merge( this.props, props ), function(com){
    var col = com.db.collection(com.name);
    col.findOne(com.query, function(err, results) {
      com.db.close();
      com.cb(err, results);
    });
  });
};

module.exports = findOne;
