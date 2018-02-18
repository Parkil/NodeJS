/**
 * http-proxy + crossload 예제
 */

var http = require('http');
var fs = require('fs');
var connect = require('c:/Dev/nodejs/node_modules/connect');
var c_static = require('c:/Dev/nodejs/node_modules/connect-static');
var http_proxy = require('c:/Dev/nodejs/node_modules/http-proxy');
var crossroads = require('c:/Dev/nodejs/node_modules/crossroads');
var base = 'C:/Dev/eclipse_oxygen/workspace/MyNodeJS/httpproxy_test';
var proxy = http_proxy.createProxyServer();

//proxy서버(http로 서버를 생성하고 서버내에서 proxy를 설정)
http.createServer(function(req, res) {
	if(req.url.match(/^\/node\//)) {
		proxy.web(req, res, {
			target : 'http://localhost:8001'
		});
	}else {
		proxy.web(req, res, {
			target : 'http://localhost:8124'
		});
	}
}).listen(9000);

crossroads.addRoute('/node/{id}/', function(id) {
	console.log('accessed node' + id);
});

//동적 파일서버
http.createServer(function(req, res) {
	crossroads.parse(req.url);
	res.end('that\'s all!');
}).listen(8001);

//정적 파일서버
http.createServer(function(req, res) {
	var file = fs.createReadStream('./main.html');
	file.on('open', function() {
		file.pipe(res);
	});
	
	file.on('error',function(err) {
		console.log('error log',err);
	});
}).listen(8124)

