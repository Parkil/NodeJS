/**
 * http-proxy를 이용한 프록시 서버 예제
 */

var http = require('http');
var http_proxy = require('c:/Dev/nodejs/node_modules/http-proxy');

console.log(http_proxy);
http_proxy.createProxyServer({target:'http://localhost:8080'}).listen(8000); //8000번으로 접속하면 target에 지정된 url로 요청을 중계처리


/*
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.write('request successfully proxied!\n'+JSON.stringify(req.headers, true, 2));
	res.end();
}).listen(9000);
*/
