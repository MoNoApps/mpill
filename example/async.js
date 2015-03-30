//Vars
var MPill = require('../index.js');
var url = 'mongodb://127.0.0.1/mpill';


var ackDropDatabase = function(a, b){
  console.log('done');
};


var users =  new MPill({name: 'users', url: url, cb: ackDropDatabase})
var groups =  new MPill({name: 'groups', url: url, cb: ackDropDatabase})
var companies =  new MPill({name: 'companies', url: url, cb: ackDropDatabase})

/**
  * This test inserts in async way 100 models into mpill db.
  */
var doUsers = function(){
  for(var i = 0; i < 100; i++){
    var props = {doc: {name: "users", version: i} };
    users.insert(props);
  }
};

var doGroups = function(){
  for(var i = 0; i < 100; i++){
    var props = {doc: {name: "groups", version: i} };
    groups.insert(props);
  }
};

var doCompanies = function(){
  for(var i = 0; i < 100; i++){
    var props = {doc: {name: "companies", version: i} };
    companies.insert(props);
  }
};

doUsers();
doGroups();
doCompanies();
