var MPill = require('../index.js');
var url = 'mongodb://127.0.0.1/mpill';

var TPill = require('tpill').TPill;
var tpill = new TPill();

var companies = new MPill({ name: 'companies', url: url});
var myCompany = {name: 'MoNoApps'};
var secondCompany = {name: 'MPill Tool'};

var endTest = function(){
  tpill.run(function(){
    process.exit();
  });
};

var ackCreate = function(err, col){
  tpill.create('companies', col.s.name, 'create', true);

  companies.drop({doc: myCompany, cb: ackDrop});
};

var ackDrop = function(err, results){
  tpill.create(true, results, 'drop', true);

  companies.insert({doc: myCompany, cb: ackInsert});
};

var ackInsert = function(err, results){
  var cname = results.ops? results.ops[0].name: results[0].name;
  tpill.create(myCompany.name, cname, 'insert', true);

  var opts = {
    query: {'_id': myCompany._id},
    doc: { $set : {name: 'MoNoApps LLC', upgrade: true} },
    cb: ackUpdate
  };
  companies.update(opts);
};

var ackUpdate = function(err, results){
  var resp = results.result? results.result.ok: results;
  tpill.create(1, resp, 'update', true);

  var opts = {
    query: {'_id': myCompany._id},
    cb: ackFindOne
  };

  companies.findOne(opts);
};

var ackFindOne = function(err, results){
  tpill.create('MoNoApps LLC', results.name, 'findOne', true);

  var hex_value = myCompany._id.toString();
  var opts = {
    query: {'_id': hex_value},
    key: '_id',
    cb: ackFindByObjectId
  };

  companies.findByObjectId(opts);
};

var ackFindByObjectId = function(err, results){
  tpill.create('MoNoApps LLC', results.name, 'findByObjectId', true);

  var hex_value = myCompany._id.toString();
  var opts = {
    query: {'_id': hex_value},
    key: '_id',
    doc: { $set : {name: 'MoNoApps LLC CO'} },
    cb: ackUpdateByObjectId
  };

  companies.updateByObjectId(opts);
};

var ackUpdateByObjectId = function(err, results){
  var resp = results.result? results.result.ok: results;
  tpill.create(1, resp, 'updateByObjectId', true);

  var hex_value = myCompany._id.toString();
  var opts = {
    query: {'_id': hex_value},
    key: '_id',
    doc: { $set : {name: 'MoNoApps LLC CO'} },
    cb: ackRemoveByObjectId
  };

  companies.removeByObjectId(opts);
};

var ackRemoveByObjectId = function(err, results){
  var resp = results.result? results.result.ok: results;
  tpill.create(1, resp, 'removeByObjectId', true);

  var opts = { cb: ackCount };

  companies.count(opts);
};

var ackCount = function(err, results){
  tpill.create(0, results, 'count', true);

  var opts = { cb: ackDropDatabase };

  companies.dropDatabase(opts);
};

var ackDropDatabase = function(err, results){
  tpill.create(true, results, 'dropDatabase', true);

  endTest();
};

companies.create({doc: myCompany, cb: ackCreate});
