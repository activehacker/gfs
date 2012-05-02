/**
 * Module dependencies
 */

 var express = require('express');
 var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;
 //var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

 var app = module.exports = express.createServer();

 //Configuration

 app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('product', function(){
  app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider('localhost', 27017);
//var articleProvider = new ArticleProvider();

console.log('app-mongo start to save three articles ...')

/*
articleProvider.save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
  ], function(error, articles){});
*/

//Routes

app.get('/', function(req, res) {
	articleProvider.findAll( function(error, docs) {
		res.render('index', {
			title: "Mongo test 2 Blog",
			articles: docs
		});
	});
});

app.get('/blog/new', function(req, res) {
	res.render('blog_new', {
		title: 'New Blog'
	});
})

app.post('/blog/new', function(req, res) {
	articleProvider.save({
		title: req.param('title'),
		body: req.param('body')
	}, function(error, docs) {
		res.redirect('/');
	});
});

app.get('/blog/:id', function(req, res){
	articleProvider.findById(req.params.id, function(error, article) {
		res.render('blog_show', {
			title: article.title, 
			article: article
		});
	});
});

app.post('/blog/addComment', function(req, res) {
	articleProvider.addCommentToArticle(req.param('_id'), {
		person: req.param('person'),
		comment: req.param('comment'),
		created_at: new Date()
	}, function(error, docs) {
		res.redirect('/blog/' + req.param('_id'));
	});
});

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);





























