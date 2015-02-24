/**
 * express + 템플릿 엔진(jade or ejs or custom)을 이용하여 웹 페이지를 표시하는 예제
 */

var express 	= require('c:/Dev/language/nodejs/node_modules/express/');
var http		= require('http');
var logger		= require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var app = express();

app.set('views', __dirname + '/views'); //템플릿 파일이 들어있는 기본 디렉토리 지정

/*
 * 해당 템플릿 엔진소스가 (npm install 소스) express와 같은 경로상에 있으면 따로 지정을 하지 않아도 템플릿 엔진을 인식 하는거 같다.
 * 이에 대해서는 추가적인 조사가 필요
 */
app.set('view engine', 'ejs'); //템플릿 엔진 지정 만약 값이 문자열이 아닐경우 "Cannot find module '[object Object]'" 에러가 발생함

app.get('/', function(request, response) {
	
	//index --> /views/index.ejs를 지칭
	response.render('index',{title : 'puhaha'});
});

http.createServer(app).listen(8081, function() {
	logger.info('Express server listening on port '+8081);
});
