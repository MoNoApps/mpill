//MPill library
var callback = function(e, r) {
  console.log(e);
  console.log(r);
};

var mpill = function(props){
  this.props = this.merge( require('./api/missings.json'), props );
};

//--- common functions ---//
mpill.prototype.find = require('./api/find');
mpill.prototype.drop = require('./api/drop');
//mpill.prototype.merge = require('./api/merge');
mpill.prototype.multi = require('./api/multi');
mpill.prototype.count = require('./api/count');
mpill.prototype.create = require('./api/create');
mpill.prototype.insert = require('./api/insert');
mpill.prototype.update = require('./api/update');
mpill.prototype.remove = require('./api/remove');
mpill.prototype.connect = require('./api/connect');
mpill.prototype.findOne = require('./api/findOne');
mpill.prototype.parseOId = require('./api/parseOId');
mpill.prototype.dropIndex = require('./api/dropIndex');
mpill.prototype.createIndex = require('./api/createIndex');
mpill.prototype.dropDatabase = require('./api/dropDatabase');
//--- complex functions---//
mpill.prototype.findByObjectId = require('./api/findByObjectId');
mpill.prototype.updateByObjectId = require('./api/updateByObjectId');
mpill.prototype.removeByObjectId = require('./api/removeByObjectId');
//--- math functions ---//
mpill.prototype.inc = require('./api/inc');
mpill.prototype.set = require('./api/set');
mpill.prototype.unset = require('./api/unset');
mpill.prototype.upsert = require('./api/upsert');
//--- helpers ---//
mpill.prototype.merge = require('./api/merge');

module.exports = mpill;
