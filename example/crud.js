var MPill = require('../mpill.js').MPill;
var TPill = require('tpill').TPill;
var tpill = new TPill();
var url = 'mongodb://127.0.0.1/mpill';
var companies = new MPill('verbose', url);
var myCompany = {name: 'MoNoApps'};

//Ensure collection exist before drop it
companies.CreateCollection(function(err, collection){
  if (err) throw err;
  tpill.create(companies.NAME, collection.collectionName, 'CreateCollection', true);

  //Clean collection
  companies.DropCollection(function(err,results){
    if (err) throw err;
    tpill.create(true, results, 'DropCollection', true);

    companies.Insert(myCompany,function(err,results){
      if (err) throw err;
      myCompany =  results[0];
      tpill.create(myCompany.name, results[0].name, 'Insert', true);

      companies.Update({'_id': myCompany._id}, { $set : {name: 'MoNoApps LLC', upgrade: true} }, function(err,results){
        if (err) throw err;
        tpill.create(1, results, 'Update', false);

        companies.FindOne({'_id': myCompany._id}, function(err,results){
          if (err) throw err;
          tpill.create('MoNoApps LLC', results.name, 'FindOne', true);

          companies.Count({}, function(err,results){
            if (err) throw err;
            tpill.create(1, results, 'Count', true);
            tpill.create('number', typeof results, 'Finish Task', true);

            tpill.run(function(){
              process.exit()
            });
          });
        });
      });
    });
  });
});
