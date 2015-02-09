/**
 * New node file
 */
var http = require('http');
var fs	 = require('fs');
/*
 * node js가 신버전으로 올라가면서 예전에는 app.use(app.router)식으로 쓰던 것이 사라졌고 
 * 기존 middleware를 app.use(~)로 사용하던것을 전부 require로 사용하도록 변경되었음.
 */
var express = require('c:/Dev/language/nodejs/node_modules/express');

/*
 * Body parser : method가 post일때 파라메터값을 가져오는데 사용
 * 원래는 express에 있었는데 지금은 따로 빠졌음
 */
var bodyparser = require('c:/Dev/language/nodejs/node_modules/body-parser');
//var bodyParser = require('body-parser');

/*
 * node js가 신버전으로 올라가면서 express에서 지원하는 logger가 없어져서 외부 API를 설치함
 */
var logger = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var app = express();

/*
 * 해당 경로에 있는 이미지파일이나 기타파일을 웹서버 root 경로에 올린다 해당파일은 http://127.0.0.1:52273/~.jpg 식으로 접근할 수 있다.
 */
app.use(express.static('d:/public'));

/*
 * 예전 : app.use(express.bodyParser());
 * 지금 바뀐 방식 : 
 * app.use(bodyparser.urlencoded({ extended: false }));
   app.use(bodyparser.json());
 */
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.limit('10mb'));

app.get('/a', function(req, res) {
	res.send('<a href="/b">Go To B</a>');
});

app.get('/b', function(req, res) {
	res.send('<a href="/a">Go To A</a>');
});

app.get('/input', function(req, res) {
	fs.readFile('input.html', function(error,data) {
		res.send(data.toString());
	});
});

app.post('/input', function(req,res) {
	var id = req.param('val1');
	var pw = req.param('val2');
	
	logger.info('id : '+id);
	logger.info('pw : '+pw);
	logger.info(req.body);
	
	res.send('<h1>id : '+id+' pw : '+pw+'</h1>');
});

/*
 * 위에서 지정하지 않은 모든 URL은 여기에서 처리하게 된다.
 */
app.all("*", function(req,res) {
	res.send("<h1>404 - File Not Found</h1>");
});

http.createServer(app).listen(52275, function() {
	logger.info('hello world');
	console.log('Server Started at http://127.0.0.1:52275');
});


