/**
 * http://usejsdoc.org/
 * http서버 요청 응답시 스트림을 이용하여 응답하는 예제
 */

var http = require('http'),
	fs = require('fs'),
	mime = require('c:/Dev/nodejs/node_modules/mime'),
	base = './';
	
http.createServer(function(req, resp) {
	var pathname = base+req.url;
	console.log('pathname', pathname);
	console.log('req.url', req.url);
	console.log('mime', mime.getType(req.url));
	
	
	fs.stat(pathname, function(err, stats) {
		if(err) {
			console.log('request resource unavailable');
			resp.writeHead(404);
			resp.write('404 Not Found');
			resp.end();
		}else if(stats.isFile()) {
			console.log('request resource available');
			resp.setHeader('Content-Type', mime.getType(req.url));
			resp.statusCode = 200;
			
			/*
			 * 여기에서 fs.readFile을 사용할수도 있다 그러나 fs.readFile은 파일내용을 메모리에 다 올리는 구조
			 * 이기때문에 여러건의 요청이들어오게 되면 문제가 발생할 수 있다.
			 */
			var file = fs.createReadStream(pathname);
			file.on('open', function() {
				file.pipe(resp);
			});
			
			file.on('error',function(err) {
				console.log('error log',err);
			});
		}else {
			console.log('request resource forbidden');
			resp.writeHead(403);
			resp.write('403 Forbidden');
			resp.end();
		}
	});
	console.log('==========================');
}).listen(8080);

console.log('Server running at 8080');




