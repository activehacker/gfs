var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('node-mongo-blog', new Server('127.0.0.1', 27017, {auto_reconnect: true}, {}));

db.open(function(){
	db.collection('test_insert_mongo', function(error, collection) {
		collection.insert({name: "ian test mongodb save"});
	});

	db.collection('test_insert_mongo', function(error, collection) {
		collection.find().toArray(function(err, results) {
        	console.log(results);
    	});
	});	
});
