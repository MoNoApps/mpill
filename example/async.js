//Vars
var MPill     = require('../mpill.js').MPill;
var url       = 'mongodb://127.0.0.1/mpill';
var users     = new MPill('users', url);
var groups    = new MPill('groups', url);
var companies = new MPill('companies', url);

/**
  * This test inserts in async way 10 models into mpill db.
  */
var doUsers = function(){
  for(var i = 0; i < 10; i++){
    var doc = {name: "user",version: i};
    users.Insert(doc);
  }
};

var doGroups = function(){
  for(var i = 0; i < 10; i++){
    var doc = {name: "group",version: i};
    groups.Insert(doc);
  }
};

var doCompanies = function(){
  for(var i = 0; i < 10; i++){
    var doc = {name: "company",version: i};
    companies.Insert(doc);
  }
};

doUsers();
doGroups();
doCompanies();
