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

Multiple models at a once
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
users.Connect(cb)
users.DropDB(cb)

'Common methods'
users.Insert(doc, cb)
users.Update(query, doc, concern, cb)
users.Remove(query, cb)
users.Find(query, cb, project, options, limit, sort)
users.FindOne(query, cb)
users.FindByObjectId(query, key, cb)
users.CreateIndex(query, cb)
users.DropCollection(query, cb)
users.DropIndex(query, cb)
users.CreateCollection(cb)
users.Count(query, cb)
````

Test with tpill
==
Running [CRUD sample](example/crud.js)
````bash
npm install
// mongod --dbpath $HOME/data/mpill &
node example/crud.js
````
Results:
````shell
✓ CreateCollection
✓ DropCollection
✓ Insert
✓ Update
✓ FindOne
✓ FindByObjectId
✓ Count
✓ Finish Task

Statistics: {"pass":8,"fail":0,"warn":0}
````

Test with mocha
===
Keeps definded functions.
```bash
mocha
13 passing (9ms)
```

About concern
===
Full api doc: http://docs.mongodb.org/manual/reference/write-concern/

````js
//Sample with concern
var concern = {w:1}; //Use primary node server
````
