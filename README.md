mpill
=====

MoNoApps MongoDB Model Pill.
Use this model to prevent rewrite same model many times.
This pill ensure that you are open and closing the db connections.

If you want to use the full api use [mongodb driver](http://mongodb.github.io/node-mongodb-native/)

If you want to use strict models with structures use [mongose schemas](http://mongoosejs.com/docs/guide.html)

If  schemas or custom options/settings are not important right now for your project, then feel free to use mpill.

Workflow looks like:
````js
1=>'requiere mpill'
2=>'instanciate a collection'
3=>'call one of in list [Insert|Update|Remove|Find|FindOne|CreateIndex|DropCollection|DropIndex|Count]'
4=>'remember, you do not need to open and  close db'
````

Test real examples with tpill
==
Install two packages
````bash
npm install mongodb
npm install tpill
````
Run mongodb server
````bash
bin/mongod --dbpath mypath/data/mpill
````
Execute the sample:
````bash
node example/crud.js
````
If all gone well you will see someting like
````shell
✓ CreateCollection
✓ DropCollection
✓ Insert
✓ Update
✓ FindOne
✓ Finish Task
✓ Count

Statistics: {"pass":5,"fail":0,"warn":0}
````
Connect to mongodb instance with
````json
bin/mongo
...connecting...
>use mpill
> db.companies.find().pretty()
{
	"_id" : ObjectId("53ebc56689f9c5a536ee4625"),
	"name" : "MoNoApps LLC",
	"upgrade" : true
}
````

Test with mocha
===
For now just check that functions exists
```bash
mocha
```

Usage
===
````js
'Import pill'
var MPill = require('mpill').MPill;
var url = 'mongodb://127.0.0.1/mpill';
users = new MPill('users', url);

'Generic methods'
users.Connect(cb)
users.DropDB(cb)

'Common methods'
users.Insert(doc, cb)
users.Update(query, doc, concern, cb)
users.Remove(query, cb)
users.Find(query, cb, project, options, limit, sort)
users.FindOne(query, cb)
users.CreateIndex(query, cb)
users.DropCollection(query, cb)
users.DropIndex(query, cb)
users.CreateCollection(cb)
users.Count(query, cb)
````
About concern
===
You can read this: http://docs.mongodb.org/manual/reference/write-concern/

Or just write
````js
{w:1} //Use primary node server
````
