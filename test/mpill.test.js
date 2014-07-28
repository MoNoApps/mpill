var MPill = require('../mpill.js').MPill;
var assert = require("assert");

var url = 'mongodb://127.0.0.1/mpill';
users = new MPill('users', url);
others = new MPill('others', url);

describe('desscribe MPill', function(){

  describe('#MPill()', function(){
    it('MPill should instance of MPill', function(){
      assert.equal('MPill', typeof MPill);
    })
  })

})
