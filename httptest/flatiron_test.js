/*
 * flatiron framework 예제
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');
var fs		 = require('fs');

var flatiron = require('d:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var logger	 = require('d:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });

var director = require('d:/Dev/language/nodejs/node_modules/director');
var plates	 = require('d:/Dev/language/nodejs/node_modules/plates');

app.use(flatiron.plugins.http);

var routes = {
		'/insert' : { get : insertView, post : insert }
}

function insertView() {
	var html = fs.readFileSync('input.html', 'utf-8');
	this.res.writeHead('Content-Type','text/html');
	this.res.end(html);
}

function insert() {
	logger.info('val1 : '+this.req.body.val1);
	logger.info('val2 : '+this.req.body.val2);
}

var router = new director.http.Router(routes);

var server = http.createServer(function(req, res) {
	req.chunks = [];
	req.on('data', function(chunk) {
		req.chunks.push(chunk.toString());
	});
	
	router.dispatch(req, res, function(err) {
		if(err) {
			logger.error(err);
			res.writeHead(404);
			res.end('Page Not Found');
		}
	});
});

server.listen(9000);
