/**
 * 최초 테스트
 */
var http = require('http');

http.createServer(function(req,res) {
	res.writeHead(200, {'content-type' : 'text/plain'});
	res.end('Hello World');
}).listen(10000);

console.log('Server running');