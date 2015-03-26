var models = require('../index.js');
var url = 'mongodb://127.0.0.1/mpill';
var next = function(a,b){
  console.log(a,b.s.name);
};

var TPill = require('tpill').TPill;
var tpill = new TPill();

var companiesOpt = { name: 'companies', url: url, cb: next };
var myCompany = {name: 'MoNoApps'};
var secondCompany = {name: 'MPill Tool'};

// Ensure collection exists before drop it
models.create(companiesOpt, function(err){
  if (err){ return console.log(err); }
  models.create(true, results, 'CreateCollection', true);

  // Clean collection
  models.drop(companiesOpt, function(err,results){
    if (err){ return console.log(err); }
    tpill.create(true, results, 'DropCollection', true);

    models.Insert(myCompany,function(err,results){
      if (err){ return console.log(err); }
      myCompany =  results[0];
      tpill.create(myCompany.name, results[0].name, 'Insert', true);

      models.update({'_id': myCompany._id}, { $set : {name: 'MoNoApps LLC', upgrade: true} }, function(err,results){
        if (err){ return console.log(err); }
        tpill.create(1, results, 'Update', false);

        models.findOne({'_id': myCompany._id}, function(err,results){
          if (err){ return console.log(err); }
          tpill.create('MoNoApps LLC', results.name, 'FindOne', true);

          //var hex_value = '3ced938e'; this throws an error because is notinvalid
          var hex_value = myCompany._id.toString();
          models.findByObjectId({'_id': hex_value}, '_id', function(err,results){
            if (err){ return console.log(err); }
            tpill.create('MoNoApps LLC', results.name, 'FindByObjectId', true);

            hex_value = myCompany._id.toString();
            models.updateByObjectId({'_id': hex_value}, { $set : {name: 'MoNoApps LLC CO'} },  '_id',function(err,results){
              if (err){ return console.log(err); }
              tpill.create(1, results, 'UpdateByObjectId', true);

              models.insert(secondCompany,function(err,results){
                if (err){ return console.log(err); }
                secondCompany = results[0];

                hex_value = secondCompany._id.toString();
                models.removeByObjectId({'_id': hex_value},'_id',function(err,results){
                  if (err){ return console.log(err); }
                  tpill.create(1, results, 'RemoveByObjectId', true);

                  models.count({}, function(err,results){
                    if (err){ return console.log(err); }
                    tpill.create(1, results, 'Count', true);

                    models.dropDatabase(function(err,results){
                      if (err){ return console.log(err); }
                      tpill.create(true, results, 'DropDB', true);

                      tpill.run(function(){
                        process.exit();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
