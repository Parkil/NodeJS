/*
 * flatiron framework 예제(기본)
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');

var flatiron = require('d:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var logger	 = require('d:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });

var director = require('d:/Dev/language/nodejs/node_modules/director');

app.use(flatiron.plugins.http);

function showAuthor() {
	logger.info('showAuthor');
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('Carl Sagan');
}

function addInfo() {
	logger.info('addInfo');
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('Add Info');
}

/*
 * express와 달리 route변수를 설정하여 url에 해당하는 동작을 지정할 수 있다.
 * {} 안의 옵션은 get,post,on(웹에서 사용하는건 아니고 CLI환경에서 사용)
 * '/aaa' : { get : aaa} -> /aaa url을 입력하면 aaa 함수를 실행한다.
 * 
 * '/aaa' : {
 * 		get : aaa,
 * 		'/bbb' : { get : bbb }
 * } -> /aaa url을 입력하면 aaa함수를 /aaa/bbb url을 입력하면 aaa 함수를 먼저실행하고 bbb함수를 실행한다.
 */
var routes = {
	'/author': {
		get: showAuthor,
		'/addInfo' : {get : addInfo}
	}
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




