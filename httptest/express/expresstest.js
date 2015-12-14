/**
 * Express �׽�Ʈ
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
	
	
	/* Header �����͸� ǥ���ϴ� ����
	var agent = request.header('user-agent');
	
	console.log(request.headers);
	//console.log("agent : "+agent); //������ ����
	
	if(agent.toLowerCase().match(/chrome/)) {
		response.send("<h1>Hello Chrome</h1>");
	} else {
		response.send("<h1>Not Chrome</h1>");
	}
	*/
	
	/* �ܼ��� html�����͸� ǥ���ϴ� ����
	response.writeHead(200,{'Content-Type' : 'text/html'});
	response.end('<h1>Hello Express</h1>');
	*/
	
	/* �����͸� ǥ�� 
	var output = [];
	
	for(var i = 0 ; i<10 ; i++) {
		output.push({
			count : i,
			name : 'name'+i
		});
	}
	
	
	response.jsonp(output); //jsonp�� ǥ��
	//response.send(output); //json���� ǥ��
	*/
	
	/*���� �޽��� ǥ��
	response.send(404,'<h1>404 Error</h1>');
	*/
	
});

http.createServer(app).listen(52238,function() {
	console.log('Server Running http://127.0.0.1:52238');
});