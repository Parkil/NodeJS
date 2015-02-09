/**
 * New node file
 */
var http = require('http');
var url	 = require('url');
var fs	 = require('fs');

var server = http.createServer(function(request,response) {
	var pathname = url.parse(request.url).pathname;
	
	if(pathname == '/index') {
		fs.readFile('index.html', function(error,data) {
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(data);
		});
	}else if(pathname == '/main') {
		
		if(request.method == 'POST') {
			request.on('data', function(data) {
				response.writeHead(200,{'Content-Type' : 'text/html'});
				response.end(data);
			});
		}
		
		fs.readFile('main.html', function(error,data) {
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(data);
		});
	}
});

server.listen(52273 , function() {
	console.log('Server Running at http://localhost:52273');
});