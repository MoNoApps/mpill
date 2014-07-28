var MPill = require('../mpill.js').MPill;
var assert = require("assert");

var url = 'mongodb://127.0.0.1/mpill';
var users = new MPill('users', url);
var others = new MPill('others', url);

describe('MPill', function(){

  describe('#Connect()', function(){
    it('should have connect function', function(){
      assert.equal(typeof users.Connect, true);
    })
  })
  describe('#Insert()', function(){
    it('should insert without error', function(done){
      users.Insert({a: 'a'},function(err,results){
        if (err) throw err;
        done();
      });
    })
  })
  describe('method update', function(){
    it('should exists find update', function(){
      assert.equal(users.Update instanceof 'function', true);
    })
  })
  describe('method remove', function(){
    it('should exists remove function', function(){
      assert.equal(users.Remove instanceof 'function', true);
    })
  })
  describe('method find', function(){
    it('should exists find function', function(){
      assert.equal(users.Find instanceof 'function', true);
    })
  })
  describe('method find one', function(){
    it('should exists find one function', function(){
      assert.equal(users.FindOne instanceof 'function', true);
    })
  })
  describe('method drop db', function(){
    it('should exists drop db function', function(){
      assert.equal(users.DropDBs instanceof 'function', true);
    })
  })
  describe('method create index', function(){
    it('should exists create index function', function(){
      assert.equal(users.CreateIndex instanceof 'function', true);
    })
  })
  describe('method drop index', function(){
    it('should exists drop index function', function(){
      assert.equal(users.DropIndex instanceof 'function', true);
    })
  })
})
