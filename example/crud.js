var MPill = require('../mpill.js').MPill;
var TPill = require('tpill').TPill;
var tpill = new TPill();
var url = 'mongodb://127.0.0.1/mpill';
var companies = new MPill('companies', url);
var myCompany = {name: 'MoNoApps'};

companies.DropCollection(function(err,results){
  if (err) throw err;
  tpill.create(!true, err, 'DropCollection',true);

  companies.Insert(myCompany,function(err,results){
    if (err) throw err;
    myCompany =  results[0];
    tpill.create(myCompany.name, results[0].name, 'Insert',true);

    companies.Update({'_id': myCompany._id}, { $set : {name: 'MoNoApps LLC', upgrade: true} }, function(err,results){
      if (err) throw err;
      tpill.create(1, results, 'Update',false);

      companies.FindOne({'_id': myCompany._id}, function(err,results){
        if (err) throw err;
        tpill.create('MoNoApps LLC', results.name, 'FindOne',true);
        tpill.create('object', typeof results, 'Finish Task',true);
        
        tpill.run(function(){
          process.exit()
        });
      });
    });
  });
});