//http://stackoverflow.com/questions/10108170/node-js-reuse-mongodb-reference

var mongodb = require('mongodb');

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ArticleProvider = function(host, port) {
	console.log('new ArticleProvider ...');

	this.db_connector = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));

	if (!this.db_connector) {
		throw new Error("can't initialize db");
	}

	var self = this;

	this.db_connector.open(function(error, db) {
		console.log('mongodb is openning...');
		self.db = db;
	});
}

ArticleProvider.prototype.getCollection = function(callback) {
	console.log('get collection ...');
	if (this.db != undefined) {
        var collection = new mongodb.Collection(this.db, 'blogs3');
        callback(null, collection);
        return;
    }
};

ArticleProvider.prototype.findAll = function(callback) {
	console.log('start to find all articles:');

	this.getCollection(function(error, article_collection) {
		if(error) callback(error)
		else {
			article_collection.find().toArray(function(error, results) {
				if(error) callback(error)
				else callback(null, results);
			});
		}
	});
};

ArticleProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, article_collection) {
		if(error) callback(error)
		else {
			var _id = article_collection.db.bson_serializer.ObjectID.createFromHexString(id);
			article_collection.findOne({_id: _id}, function(error, result){
				if(error) callback(error)
				else callback(null, result)
			});
		}
	});
};

ArticleProvider.prototype.addCommentToArticle = function(articleId, comment, callback) {
  this.getCollection(function(error, article_collection) {
    if( error ) callback( error );
    else {
      article_collection.update(
        {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
        {"$push": {comments: comment}},
        function(error, article){
          if( error ) callback(error);
          else callback(null, article)
        });
    }
  });
};


ArticleProvider.prototype.save = function(articles, callback) {

	console.log('start to save articles ... ----------->');
	this.getCollection(function(error, article_collection) {
		var article = null;

		if(error) callback(error)
		else {
			if( typeof(articles.length) === 'undefined') {
				articles = [articles];
			}

			for (var i = 0; i < articles.length; i++) {
				article = articles[i];
				article.created_at = new Date();
				if (article.comments === undefined) {
					article.comments = [];
				}	
				for (var j = 0; j < article.comments.length; j++) {
					article.comments[j].created_at = new Date();
				};
			}

			console.log('articles length:' + articles.length);

			for (var key in article) {
				console.log('key:' + key + ', value:' + article[key]);
			}


			article_collection.insert(articles, function() {
				callback(null, articles);
			});
		}
	});
};

exports.ArticleProvider = ArticleProvider;





























