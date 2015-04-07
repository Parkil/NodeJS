/*
 * flatiron framework 예제
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');

var flatiron = require('d:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var logger	 = require('d:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });

var director = require('d:/Dev/language/nodejs/node_modules/director');

app.use(flatiron.plugins.http, {
	
});

function showAuthor() {
	logger.info('test');
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('Carl Sagan');
}

var routes = {
	'/authors': {on: showAuthor},
	'/aaa': {on: showAuthor}
};

var router = new director.http.Router(routes);

var server = http.createServer(function(req, res) {
	router.dispatch(req, res, function(err) {
		logger.info('request url : '+req.url);
		if(err) {
			logger.info(err);
			res.writeHead(404);
			res.end();
		}
	});
});

router.get('/zzz', function() {
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('zzz');
});

server.listen(9000);




