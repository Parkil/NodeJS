/**
 * nodejs를 여러번 호출하는 예제
 */

var http = require('http');

var options = {
	host : 'localhost',
	port : 10000,
	path : '/?file=readfile',
	method : 'GET'
};

var processPublicTimeline = function(response) {
	
	response.setEncoding('utf-8');
	//response.setEncoging이 호출되지 않으면 8진수 값으로, 호출되면 문자열로 표시된다.
	response.on('data', function(chunk) {
		console.log(chunk);
	});
};

for(var i = 0 ; i < 1 ; i++) {
	http.request(options, processPublicTimeline).end();
}
