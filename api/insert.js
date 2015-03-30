var insert = function(props) {
  this.connect(this.merge( this.props, props ), function(com) {
    var col = com.db.collection(com.name);
    col.insert(com.doc, function(err, results) {
      com.db.close();
      com.cb(err, results);
    });
  });
};

module.exports = insert;
