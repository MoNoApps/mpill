//Vars
var models = require('../index.js');
var url = 'mongodb://127.0.0.1/mpill';
var next = function(){};

/**
  * This test inserts in async way 100 models into mpill db.
  */
var doUsers = function(){
  for(var i = 0; i < 100; i++){
    var u = { url: url, cb: next};
    u.name = 'users';
    u.doc = {name: "user",version: i};
    models.insert(u);
  }
};

var doGroups = function(){
  for(var i = 0; i < 100; i++){
    var g = { url: url, cb: next};
    g.name = 'groups';
    g.doc = {name: "group",version: i};
    models.insert(g);
  }
};

var doCompanies = function(){
  for(var i = 0; i < 100; i++){
    var c = { url: url, cb: next};
    c.name = 'companies';
    c.doc = {name: "company",version: i};
    models.insert(c);
  }
};

doUsers();
doGroups();
doCompanies();
