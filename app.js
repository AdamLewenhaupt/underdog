/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , lessMW = require('less-middleware')
  , persistent = require('./persistant')
  , services = require('./services').services;

var app = express();

persistent.connect();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: "the most secret secret in secret" }));
  services.auth.use(app);
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(lessMW({ src: path.join(__dirname, 'public'), compress: true }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/persistent/:type/:id?', persistent.get);
app.post('/persistent/:type', persistent.post);
app.put('/persistent/:type/:id', persistent.put);

services.auth.route(app);

var server = http.createServer(app);

services.io.init(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});