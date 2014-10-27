var MongoClient = require('mongodb').MongoClient;

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
  try{
    MongoClient.connect(mp.URL, function(err, db) {
      if (db === null){
        console.log('Connection can not be established. (URL: %j)', mp.URL);
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
            cb("ERR: No db object found.");
          }else{
            console.log("ERR: No db object found.");
          }
        }
      }
    });
  }catch(e){
    console.log('Connection can not be established. (URL: %j)', mp.URL);
    console.log(e);
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
/*
  From mongodb.org
  FIELDS

  $inc  Increments the value of the field by the specified amount.
  $mul  Multiplies the value of the field by the specified amount.
  $rename Renames a field.
  $setOnInsert  Sets the value of a field upon document creation during an upsert. Has no effect on update operations that modify existing documents.
  $set  Sets the value of a field in a document.
  $unset  Removes the specified field from a document.
  $min  Only updates the field if the specified value is less than the existing field value.
  $max  Only updates the field if the specified value is greater than the existing field value.
  $currentDate  Sets the value of a field to current date, either as a Date or a Timestamp.

  ARRAYS
  $ Acts as a placeholder to update the first element that matches the query condition in an update.
  $addToSet Adds elements to an array only if they do not already exist in the set.
  $pop  Removes the first or last item of an array.
  $pullAll  Removes all matching values from an array.
  $pull Removes all array elements that match a specified query.
  $pushAll  Deprecated. Adds several items to an array.
  $push Adds an item to an array.

  MODIFIERS
  $each Modifies the $push and $addToSet operators to append multiple items for array updates.
  $slice  Modifies the $push operator to limit the size of updated arrays.
  $sort Modifies the $push operator to reorder documents stored in an array.
  $position Modifies the $push operator to specify the position in the array to add elements.

  BITWISE
  $bit  Performs bitwise AND, OR, and XOR updates of integer values.

  ISOLATED
  $isolated Modifies behavior of multi-updates to increase the isolation of the operation.
*/
/*
  http://docs.mongodb.org/manual/reference/write-concern/
  write concern posible values (n)
  n=1: primary
  n=0: disables ackowledgment
  n>1: at least n secondaries acknowledgements
  "majority" : equal to 'w: 1'

*/

MPill.prototype.Update = function(query, doc, concern, cb) {
  var mp = this;
  this.Connect(function(err, db){
    var col = db.collection(mp.NAME);
    if (!query || !doc){
      return cb({error: {message: 'Query and Doc are required.'}})
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
    var col = db.collection(mp.NAME);
    col.findOne(query || {}, function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

MPill.prototype.DropDB = function(cb) {
  this.Connect(function(err, db){
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
    var col = db.collection(mp.NAME);
    col.count(function(err, results) {
      db.close();
      if(cb){
        cb(err, results);
      }
    });
  })
};

//Prevents "MongoError: ns not found"
MPill.prototype.CreateCollection = function(cb) {
  var mp = this;
  this.Connect(function(err, db){
    db.createCollection(mp.NAME, function(err, collection) {
      db.close();
      if(cb){
        cb(err, collection);
      }
    });
  })
};

module.exports.MPill = MPill;
