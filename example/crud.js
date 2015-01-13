var MPill = require('../mpill.js').MPill;
var TPill = require('tpill').TPill;
var tpill = new TPill();
var url = 'mongodb://127.0.0.1/mpill';
var companies = new MPill('verbose', url);
var myCompany = {name: 'MoNoApps'};

// Ensure collection exists before drop it
companies.CreateCollection(function(err, collection){
  if (err){ return console.log(err); }
  tpill.create(companies.NAME, collection.collectionName, 'CreateCollection', true);

  // Clean collection
  companies.DropCollection(function(err,results){
    if (err){ return console.log(err); }
    tpill.create(true, results, 'DropCollection', true);

    companies.Insert(myCompany,function(err,results){
      if (err){ return console.log(err); }
      myCompany =  results[0];
      tpill.create(myCompany.name, results[0].name, 'Insert', true);

      companies.Update({'_id': myCompany._id}, { $set : {name: 'MoNoApps LLC', upgrade: true} }, function(err,results){
        if (err){ return console.log(err); }
        tpill.create(1, results, 'Update', false);

        companies.FindOne({'_id': myCompany._id}, function(err,results){
          if (err){ return console.log(err); }
          tpill.create('MoNoApps LLC', results.name, 'FindOne', true);

          //var hex_value = '3ced938e'; this throws an error because is notinvalid
          var hex_value = myCompany._id.toString();
          companies.FindByObjectId({'_id': hex_value}, '_id', function(err,results){
            if (err){ return console.log(err); }
            tpill.create('MoNoApps LLC', results.name, 'FindByObjectId', true);

            hex_value = myCompany._id.toString();
            companies.UpdateByObjectId({'_id': hex_value}, { $set : {name: 'MoNoApps LLC CO'} },  '_id',function(err,results){
              if (err){ return console.log(err); }
              tpill.create(1, results, 'UpdateByObjectId', true);

              companies.Count({}, function(err,results){
                if (err){ return console.log(err); }
                tpill.create(1, results, 'Count', true);

                companies.DropDB(function(err,results){
                  if (err){ return console.log(err); }
                  tpill.create(true, results, 'DropDB', true);

                  tpill.run(function(){
                    process.exit()
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
