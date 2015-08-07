////////////////
//  server.js //
////////////////
var http   = require('http');
var server = http.createServer();
var port   = 8282;
var app    = require('./app').create();

server.on('request', app);

server.listen(port, function(){
	console.log("Now I'm ready", server.address());
});


//////////////
//  app.js  //
//////////////
module.exports.create = function() {
	var express      = require('express');
	var bodyParser   = require('body-parser');
	var app          = express();
	var staticServer = express.static(__dirname + '/public');

	function handler(req, res) {
		console.log(req.body);
		res.send(req.body);	
	}

	function logger(req, res, next) {
		console.log(req.method, req.url);
		next();
	}

	app.use('/', logger);
	app.use('/', staticServer);
	app.use('/', bodyParser.json());

	app.get('/api/messages'    , handler);
	app.post('/api/messages'   , handler);
	app.delete('/api/messages' , handler);


	return app;
}