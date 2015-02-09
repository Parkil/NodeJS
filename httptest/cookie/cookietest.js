/**
 * 쿠키저장 테스트
 */
var http = require('http');

var server = http.createServer(function(request, response) {
	var date = new Date();
	response.writeHead(200,
			{
				'Content-Type' : 'text/html',
				'Set-Cookie' : ['val1 = val1','val2 = val2']
			}
	);
	
	var jsonval = JSON.stringify(request.headers.cookie);
	//var jsonobj = JSON.parse(jsonval);
	
	response.end('<h1>'+jsonval+'</h1>');
});

server.listen(52273, function() {
	console.log('Server running at http://127.0.0.1:52273');
})