/**
 * Express - Middleware �׽�Ʈ
 */
var http = require('http');
var express = require('c:/Dev/language/nodejs/node_modules/express');

var app = express();

/*
 * 3��° ���ڴ� ���� �̵����� �Ѿ �Լ����� �Լ����� ���Ǵ�� ��������
 * ���ڸ�� ȣ�� �Լ����� �ٸ� ��� �����߻�
 */
app.use(function(request, response, test) {
	console.log("1st middleware");
	test();
});

/*
 * �Ʒ��� ���� express���� �����ϴ� �̵��� �����Ҽ��� ����
 * �Ʒ����ô� �α׸� ����� �̵���� ������
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