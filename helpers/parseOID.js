var ObjectID = require('mongodb').ObjectID;

var parseOID = function(value, cb){
  try{
    return new ObjectID.createFromHexString(value);
  }catch(e){
    return cb(
      {
        'code': 'NotValidHex',
        'message': 'Key must be a valid hex.'
      }
    );
  }
};

module.exports = parseOID;
