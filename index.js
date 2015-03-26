//MPill library

var mpill = {
  find: require('./api/find'),
  drop: require('./api/drop'),
  merge: require('./api/merge'),
  multi: require('./api/multi'),
  count: require('./api/count'),
  create: require('./api/create'),
  insert: require('./api/insert'),
  update: require('./api/update'),
  connect: require('./api/connect'),
  findOne: require('./api/findOne'),
  parseOId: require('./api/parseOId'),
  dropIndex: require('./api/dropIndex'),
  createIndex: require('./api/createIndex'),
  dropDatabase: require('./api/dropDatabase'),

  findByObjectId: require('./api/findByObjectId'),
  updateByObjectId: require('./api/updateByObjectId'),
  removeObjectById: require('./api/removeObjectById'),
  
  inc: require('./api/inc'),
  set: require('./api/set'),
  unset: require('./api/unset'),
  upsert: require('./api/upsert'),
  remove: require('./api/remove')
};

module.exports = mpill;
