/**
 * ejs 템플릿을 이용하여 값을 채워서 웹에 표출하는 예제
 */

var server	= require('http');
var fs		= require('fs');

var ejs		= require('c:/Dev/language/nodejs/node_modules/ejs');

server.createServer(function(request, response) {
	fs.readFile('test.ejs','utf-8', function(error,data) {
		response.writeHead(200,{'Content-Type' : 'text/html'});
		response.end(ejs.render(data, {
			name : 'Puhaha~'
		}));
	});
}).listen(52275, function() {
	console.log('Server Running At http://localhost:52273');
});

