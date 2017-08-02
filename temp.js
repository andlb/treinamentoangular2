var MongoClient = require('mongodb').MongoClient,
 assert = require('assert');
MongoClient.connect('mongodb://localhost:27017/yucar', function(err, db) {
    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    var query = {"email": "andlbp@gmail.com"};
    db.collection('usuarios').find(query).toArray(function(err, docs) {
        empresaid = docs[0].empresa;
        var query1 = {"_id": empresaid};
        console.log(docs[0]);
        db.collection('empresas').find(query).toArray(function(err1, docs1) {
            console.log(docs1[0]);    
        });
        
        db.close();
        
    });

});