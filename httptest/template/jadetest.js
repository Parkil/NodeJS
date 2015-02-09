/**
 * Jade 템플릿을 이용하여 웹페이지를 표출하는 예제
 */
var jade	= require('c:/Dev/language/nodejs/node_modules/jade');
var http	= require('http');
var fs		= require('fs');

var server = http.createServer(function (request,response) {
	console.log("sdfsf");
	fs.readFile('test.jade', 'utf-8', function(error,data) {
		var fn = jade.compile(data);
		
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end(fn());
	});
});

server.listen(52239, function(error) {
	console.log(error);
	console.log('server listening http://127.0.0.1:52237');
});