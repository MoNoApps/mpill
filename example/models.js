var models = require('../index.js');
var url = 'mongodb://127.0.0.1/decktools';
var colls = ['users','groups','roles','tasks'];
var abc = function(err, response){
  console.log(err, response.length);
};

for (var c in colls) {
  if (colls.hasOwnProperty(c)) {
    var options = {
      url: url,
      cb: abc,
      name: colls[c]
    };

    module.exports[colls[c]] = models.find(options);
  }
}
