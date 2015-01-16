/**
 * In order to simplify the definition process
 * we can use a for loop to export every new model.
 **/
//models.js
var MPill = require('../mpill.js').MPill;
var url   = 'mongodb://127.0.0.1/collectiongroup';
var colls = ['users','groups','roles','tasks'];

//Exports every new collection
for(var c in colls){
  if (colls.hasOwnProperty(c)) {
    module.exports[colls[c]] = new MPill(colls[c], url);
  }
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
