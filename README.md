MPill
===
Coding apps without to be worried about data models.

Single model instance
===
````js
var MPill = require('mpill').MPill;
var url = 'mongodb://127.0.0.1/mpill';
users = new MPill('users', url);
````

Multiple models at once
===
models.js
````js
var MPill = require('../mpill.js').MPill;

var colls = ['users','groups','roles','tasks'];
var url   = 'mongodb://127.0.0.1/mydb';

// exports each collection
for(var i in colls){
	module.exports[colls[i]] = new MPill(colls[i], url);
}
````
userController.js (let's said this is for express route)
````js
var models = require('./models');
var Users = {};

Users.List = function(req, res){
  models.users.FindOne({'email': 'rrunner@acme.co'}, function(err, rrunner){
    if(err){ return res.status(500); }
    var query = { user_id: rrunner._id, label: 'open' };
      models.tasks.Find(query, function(err, toDo){
        if(err){ return res.status(500); }
        res.json({
          user: rrunner,
          tasks: toDo
        });
      });
    });
};
...
module.exports.Users = Users;
````

API reference
===
````js
'Generic methods'
model.Connect(cb)
model.DropDB(cb)

'Common methods'
model.Insert(doc, cb)
model.Update(query, doc, concern, cb)
model.Remove(query, cb)
model.Find(query, cb, project, options, limit, sort)
model.FindOne(query, cb)
model.CreateIndex(query, cb)
model.DropCollection(query, cb)
model.DropIndex(query, cb)
model.CreateCollection(cb)
model.Count(query, cb)
model.Aggregate(query, cb)

'Special methods'
model.FindByObjectId(query, key, cb)
model.UpdateByObjectId(query, doc, key, cb)
model.RemoveByObjectId(query, key, cb)
model.parseOID(value, cb)
````

Test with tpill
===
Running [CRUD sample](example/crud.js)
````sh
npm install
// mongod --dbpath $HOME/data/mpill &
node example/crud.js
````
Results:
````sh
✓ CreateCollection
✓ DropCollection
✓ Insert
✓ Update
✓ FindOne
✓ FindByObjectId
✓ UpdateByObjectId
✓ RemoveByObjectId
✓ Count
✓ DropDB

Statistics: {"pass":10,"fail":0,"warn":0}
````
RESTful API sample
==
Clone [deck tool](https://github.com/MoNoApps/deck) to see a restify implementation.

Test with mocha
===
Keeps definded functions.
```sh
mocha
18 passing (20ms)
```

Code quality with gulp-jshint
===

```sh
npm install gulp
npm install gulp-jshint
gulp
```

About concern
===
Full api doc: http://docs.mongodb.org/manual/reference/write-concern/

````js
//Sample with concern
var concern = {w:1}; //Use primary node server
````

## Changelog:

### v0.5.1
* Add Aggregation framework queries.
* Add tests for mongo v3

### v0.5.0
* Stable version for common queries
