
var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = module.exports = express.createServer();

app.configure(function(){
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

var articleProvider = new ArticleProvider();

console.log('save three dummy data in memory!');

articleProvider.save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
    {title: 'Post three', body: 'Body three'}
  ], function(error, articles){});

app.get('/', function(req, res){
  articleProvider.findAll(function(error, docs){
    res.render('index', {
        title: 'blog',
        articles: docs
    });
  });
});

app.listen(3000, function(){
  console.log("Node blog server listening on port %d in %s mode", app.address().port, app.settings.env);
});


/**
 * Module dependencies.
 */

/*
var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
*/