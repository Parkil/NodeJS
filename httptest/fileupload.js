/**
 * New node file
 */
var http = require('http');
var fs	 = require('fs');

var logger = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var express		= require('c:/Dev/language/nodejs/node_modules/express');
var bodyparser	= require('c:/Dev/language/nodejs/node_modules/body-parser');

/*
 * 기존 express.limit()을 대체하는 모듈
 */
var rawbody		= require('c:/Dev/language/nodejs/node_modules/raw-body');
var typer		= require('c:/Dev/language/nodejs/node_modules/media-typer');

/*
 * 기존 express 파일 업로드를 대체하는 모듈
 */
var multipart	= require('c:/Dev/language/nodejs/node_modules/connect-multiparty');
var multipartMiddleware = multipart({uploadDir : 'd:/public'});

var app = express();

/*
 * 파일업로드 크기 한도 지정
 */
/*
app.use(function (req, res, next) {
	rawbody(req, {
		length	 : req.headers['content-length'],
		limit	 : '1mb',
		encoding: typer.parse(req.headers['content-type']).parameters.charset
	}, function(err, string) {
		if(err) {
			return next(err);
		}
		
		req.text = string;
		next();
	});
});
*/

/*
 * Fiie Size Chk
 */
function sizeChk(req, res) {
	rawbody(req, {
		length	 : req.headers['content-length'],
		limit	 : '1mb',
		encoding: typer.parse(req.headers['content-type']).parameters.charset
	}, function(err, string) {
		res.send("File Size Over");
		req.text = string;
	});
}

app.get('/upload', function(req, res) {
	fs.readFile('FileUpload.html', function(error, data) {
		res.send(data.toString());
	});
});

app.post('/upload', multipartMiddleware, function(req, resp) {
	sizeChk(req,resp);
	console.log("length : "+req.headers['content-length']);
	console.log(req.body, req.files);
});

http.createServer(app).listen(8080, function() {
	logger.info('Server Started - http://127.0.0.1:8080');
});