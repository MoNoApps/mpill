var MongoClient = require('mongodb').MongoClient;
var ObjectID    = require('mongodb').ObjectID;

/**
 * MPill Object
 */
var MPill = function(name, URL){
  this.NAME = name;
  this.URL = URL;
};

/**
 * Stablish a connection with DB.
 *
 * @param function cb, the callback function.
 */
MPill.prototype.Connect = function(cb) {
  var mp = this;
  var ERR_DB_OBJECT = {code: 'DBNotFound', message: 'DB object not found'};
  var ERR_CONECTION = {code: 'ConnectionNotEstablished', message: 'Connection to ' + this.URL + ' can not be established.' };

  try{
    MongoClient.connect(mp.URL, function(err, db) {
      if (db === null){
        if (cb) {
          cb(ERR_CONECTION);
        }else{
          console.log(ERR_CONECTION);
        }
      }else if (err) {
        if (db) {
          db.close();
        }

        if (cb) {
          cb(err);
        }else{
          console.log(err);
        }
      } else {
        if (db) {
          if (cb) {
            cb(err, db);
          }
        } else {
          if (cb) {
            cb(ERR_DB_OBJECT);
          }else{
            cb(ERR_DB_OBJECT);
          }
        }
      }
    });
  }catch(e){
    console.log(e);
    cb(ERR_CONECTION);
  }
};

/**
 * Inserts a new document on a collection.
 *
 * @param String name, the collection name.
 * @param Object doc, the document to save.
 * @param function cb, the callback function,
 *   expects two params err and .
 */
MPill.prototype.Insert = function(doc, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    col.insert(doc, function(err, results) {
      db.close();
      if (cb) {
        cb(err, results);
      }
    });
  })
};

/**
 * Updates an existing document on a collection.
 *
 * @param String name, the collection name.
 * @param Object query, the query to find the document.
 * @param Object doc, the document to save.
 * @param function cb, the callback function,
 *   expects two params err and .
 */
MPill.prototype.Update = function(query, doc, concern, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    if (!query || !doc){
      return cb( {code: 'MissingParam', message: 'Query and Doc are required.'});
    }

    col.update(query, doc, concern || {w: 1}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.Remove = function(query, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    col.remove(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.Find = function(query, cb, project, options, limit, sort) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME)
    col.find(query || {}, project || {}, options || {w: 1})
       .limit(limit || 10)
       .sort(sort || {_id: 1})
       .toArray(function(err, results) {
          db.close();
          if(cb){
            cb(err, results);
          }
    });
  })
};

MPill.prototype.FindOne = function(query, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    col.findOne(query || {}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.FindByObjectId = function(query, key, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    try{
      query[key] = new ObjectID.createFromHexString(query[key]);
    }catch(e){
      return cb({'code': 'NotValidHex', 'message': '' + key + ' must be a valid hex'});
    }

    var col = db.collection(mp.NAME);
    col.findOne(query || {}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.UpdateByObjectId = function(query, doc, key, concern, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    if (!query || !doc || !key){
      return cb( {code: 'MissingParam', message: 'Query, Doc and Key are required.'});
    }

    try{
      query[key] = new ObjectID.createFromHexString(query[key]);
    }catch(e){
      return cb({'code': 'NotValidHex', 'message': '' + key + ' must be a valid hex'});
    }

    col.update(query, doc, concern || {w: 1}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.RemoveByObjectId = function(query, key, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    try{
      query[key] = new ObjectID.createFromHexString(query[key]);
    }catch(e){
      return cb({'code': 'NotValidHex', 'message': '' + key + ' must be a valid hex'});
    }
    
    var col = db.collection(mp.NAME);
    col.remove(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.DropDB = function(cb) {
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    db.dropDatabase(function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.CreateIndex = function(query, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    col.createIndex(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.DropIndex = function(query, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME)
    col.dropIndex(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.DropCollection = function(cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME)
    col.drop(function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.Count = function(query, cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(mp.NAME);
    col.count(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

// Prevents "MongoError: ns not found"
MPill.prototype.CreateCollection = function(cb) {
  var mp = this;
  this.Connect(function(err, db){
    if(err){ if(cb) { return cb(err, false); } }

    db.createCollection(mp.NAME, function(err, collection) {
      db.close();
      if(cb){
        cb(err, collection);
      }
    });
  })
};

module.exports.MPill = MPill;
