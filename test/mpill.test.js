var MPill = require('../mpill.js').MPill;
var assert = require("assert");

var url = 'mongodb://127.0.0.1/mpill';
users = new MPill('users', url);
others = new MPill('others', url);

describe('describe MPill', function(){

  describe('#MPill()', function(){
    it('users should instance of MPill', function(){
      assert.ok(users instanceof MPill);
    });

    it('others should instance of MPill', function(){
      assert.ok(others instanceof MPill);
    });
  });

});
