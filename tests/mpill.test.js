var MPill = require('../mpill.js').MPill;
var assert = require("assert");

var url = 'mongodb://127.0.0.1/mpill';
users = new MPill('users', url);
others = new MPill('others', url);

describe('Uf', function(){
  describe('uf.project kind of Project', function(){
    it('uf.project should extend of Project', function(){
      users.Insert({a:"a"},function(err, results){
        console.log(err, results)
        assert.equal(typeof MPill, 'object');

        describe('uf functions', function(){
          it('should exists common models', function(){
            assert.equal(users instanceof MPill, true);
          })
        })
      })

    })
  })
})
