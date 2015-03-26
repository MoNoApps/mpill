/**
 * In order to simplify the definition process
 * we can use a for loop to export every new model.
 **/
//models.js
var mpill = require('../index.js');
var url = 'mongodb://127.0.0.1/collectiongroup';
var next = function(a, b){
  console.log(a, b.length);
};
var colls = ['users','groups','roles','tasks'];

//Exports every new collection
for(var c in colls){
  if (colls.hasOwnProperty(c)) {
    var opt = {
      name: 'cname',
      url: url,
      cb: next
    };
    module.exports[colls[c]] = mpill.find(opt);
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
