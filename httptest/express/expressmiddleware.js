/**
 * Express - Middleware 테스트
 */
var http = require('http');
var express = require('c:/Dev/language/nodejs/node_modules/express');

var app = express();

/*
 * 3번째 인자는 다음 미들웨어로 넘어갈 함수명임 함수명은 임의대로 지정가능
 * 인자명과 호출 함수명이 다를 경우 에러발생
 */
app.use(function(request, response, test) {
	console.log("1st middleware");
	test();
});

/*
 * 아래와 같이 express에서 제공하는 미들웨어를 지정할수도 있음
 * 아래예시는 로그를 남기는 미들웨어 지정임
 */
app.use(function(request,response,test) {
	console.log("sadfsadfa");
});

app.use(function(request, response, test) {
	console.log("3rd middleware");
	
	response.writeHead(200,{'Content-Type' : 'text/html'});
	response.end("<h1>Hello World</h1>");
});

http.createServer(app).listen(52273, function() {
	console.log("Server Running at http://127.0.0.1:52273");
});