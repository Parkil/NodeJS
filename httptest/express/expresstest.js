/**
 * Express 테스트
 */
var http	= require('http');
var express = require('c:/Dev/language/nodejs/node_modules/express');

var app = express();

app.use(function (request,response) {
	//
	
	var name = request.param('name');
	var region = request.param('region');
	
	response.writeHead({'Content-Type' : 'text/html','charset' : 'euc-kr'});
	response.end('<h1>'+name+'-'+region+'</h1>');
	
	
	/* Header 데이터를 표시하는 예제
	var agent = request.header('user-agent');
	
	console.log(request.headers);
	//console.log("agent : "+agent); //브라우저 종류
	
	if(agent.toLowerCase().match(/chrome/)) {
		response.send("<h1>Hello Chrome</h1>");
	} else {
		response.send("<h1>Not Chrome</h1>");
	}
	*/
	
	/* 단순히 html데이터를 표시하는 예제
	response.writeHead(200,{'Content-Type' : 'text/html'});
	response.end('<h1>Hello Express</h1>');
	*/
	
	/* 데이터를 표시 
	var output = [];
	
	for(var i = 0 ; i<10 ; i++) {
		output.push({
			count : i,
			name : 'name'+i
		});
	}
	
	
	response.jsonp(output); //jsonp로 표시
	//response.send(output); //json으로 표시
	*/
	
	/*에러 메시지 표시
	response.send(404,'<h1>404 Error</h1>');
	*/
	
});

http.createServer(app).listen(52238,function() {
	console.log('Server Running http://127.0.0.1:52238');
});