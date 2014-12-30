/**
 * In order to simplify the definition process
 * we can use a for loop to export every new model.
 **/
//models.js
var MPill = require('../mpill.js').MPill;
var url   = 'mongodb://127.0.0.1/collectiongroup';
var colls = ['users','groups','roles','tasks'];

//Exports every new collection
for(var i in colls){
  module.exports[colls[i]] = new MPill(colls[i], url);
}

//controler.js
/**
var models = require('.../models');
var users  = models.users;
var groups = models.groups;
var roles  = models.roles;
var tasks  = models.tasks;

...

**/
