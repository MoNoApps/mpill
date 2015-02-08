// modules
var MongoClient = require('mongodb').MongoClient;

// helpers
var parseOID = require('./helpers/parseOID');

// errors
var ERR_CONECTION = {code: 'ConnectionNotEstablished', message: 'Connection to db can not be established.' };
var ERR_MISSING_P = {code: 'MissingParam', message: 'Query and Doc are required.'};

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
 * @param string name, the model name.
 */
MPill.prototype.Connect = function(cb) {
  var mpill = this;
  MongoClient.connect(mpill.URL, function(err, db) {
    if (db === null || err){
      console.log(err);
      cb(ERR_CONECTION);
    }else{
      cb(err, db, mpill.NAME);
    }
  });
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
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.insert(doc, function(err, results) {
      db.close();
      if (cb) {
        cb(err, results);
      }
    });
  });
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
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    if (!query || !doc){
      return cb( ERR_MISSING_P );
    }

    col.update(query, doc, concern || {w: 1}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.Remove = function(query, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.remove(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.Find = function(query, cb, project, options, limit, sort) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.find(query || {}, project || {}, options || {w: 1})
       .limit(limit || 10)
       .sort(sort || {_id: 1})
       .toArray(function(err, results) {
          db.close();
          if(cb){
            cb(err, results);
          }
    });
  });
};

MPill.prototype.FindOne = function(query, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.findOne(query || {}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.FindByObjectId = function(query, key, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    query[key] = parseOID(query[key], cb);

    var col = db.collection(name);
    col.findOne(query || {}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.UpdateByObjectId = function(query, doc, key, concern, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    if (!query || !doc || !key){
      return cb( {code: 'MissingParam', message: 'Query, Doc and Key are required.'});
    }

    query[key] = parseOID(query[key], cb);

    col.update(query, doc, concern || {w: 1}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.RemoveByObjectId = function(query, key, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    query[key] = parseOID(query[key], cb);

    var col = db.collection(name);
    col.remove(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.DropDB = function(cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    db.dropDatabase(function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.CreateIndex = function(query, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.createIndex(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.DropIndex = function(query, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.dropIndex(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.DropCollection = function(cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.drop(function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

MPill.prototype.Count = function(query, cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    var col = db.collection(name);
    col.count(query, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  });
};

// Prevents "MongoError: ns not found"
MPill.prototype.CreateCollection = function(cb) {
  this.Connect(function(err, db, name){
    if(err){ if(cb) { return cb(err, false); } }

    db.createCollection(name, function(err, collection) {
      db.close();
      if(cb){
        cb(err, collection);
      }
    });
  });
};

MPill.prototype.parseOID = parseOID;

module.exports.MPill = MPill;
