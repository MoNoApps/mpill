var MPill = require('../mpill.js').MPill;
var assert = require("assert");

var url = 'mongodb://127.0.0.1/mpill';
var users = new MPill('users', url);

describe('MPill functions', function(){

  describe('#Connect()', function(){
    it('should have connect function', function(){
      assert.ok(users.Connect);
    })
  })
  describe('#Insert()', function(){
    it('should insert without error', function(){
      assert.ok(users.Insert);
    })
  })
  describe('method update', function(){
    it('should exists find update', function(){
      assert.ok(users.Update);
    })
  })
  describe('method remove', function(){
    it('should exists remove function', function(){
      assert.ok(users.Remove);
    })
  })
  describe('method find', function(){
    it('should exists find function', function(){
      assert.ok(users.Find);
    })
  })
  describe('method find one', function(){
    it('should exists find one function', function(){
      assert.ok(users.FindOne);
    })
  })
  describe('method drop db', function(){
    it('should exists drop db function', function(){
      assert.ok(users.DropDB);
    })
  })
  describe('method create index', function(){
    it('should exists create index function', function(){
      assert.ok(users.CreateIndex);
    })
  })
  describe('method create index', function(){
    it('should exists drop collection function', function(){
      assert.ok(users.DropCollection);
    })
  })
  describe('method drop index', function(){
    it('should exists drop index function', function(){
      assert.ok(users.DropIndex);
    })
  })
  describe('method find by objectId', function(){
    it('should exists find by objectId function', function(){
      assert.ok(users.FindByObjectId);
    })
  })
  describe('method update by objectId', function(){
    it('should exists update by objectId function', function(){
      assert.ok(users.UpdateByObjectId);
    })
  })
})
