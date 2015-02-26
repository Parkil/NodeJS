/**
 * express + 템플릿 엔진(jade or ejs or custom)을 이용하여 웹 페이지를 표시하는 예제
 */

var express 	= require('d:/Dev/language/nodejs/node_modules/express/');
var express_pa	= require('d:/Dev/language/nodejs/node_modules/express-partials/');
var http		= require('http');
var logger		= require('d:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});
var ejs			= require('d:/Dev/language/nodejs/node_modules/ejs/');

var app = express();

app.use(express_pa()); //express-partials 지정

app.set('views', __dirname + '/layoutejs'); //템플릿 파일이 들어있는 기본 디렉토리 지정

/*
 * 템플릿 엔진을 등록 
 * 
 * 앞의 인자 : 파일 확장자
 * 뒤의 인자 : callback함수
 * 
 * ex)
 * app.engine('html', ejs.renderFile)
 * 
 * html 확장자를 가진 파일을 ejs.renderFile 함수를 이용하여 처리하는 템플릿 엔진을 등록
 */
app.engine('html', ejs.renderFile);

app.set('view engine', 'html'); //템플릿 엔진 지정 만약 값이 문자열이 아닐경우 "Cannot find module '[object Object]'" 에러가 발생함

//express + ejs
app.get('/plain', function(request, response) {
	/*
	 * main -> views지정 경로+view engine에서 지정한 확장자의 파일을 읽어들임
	 * ex)
	 * app.set('views', './layoutejs');
	 * app.set('view engine', 'ejs');
	 * 
	 *'/layoutjs/main.ejs'파일을 읽어들인다.
	 */
	response.render('main',{title:'title'});
});

//express + ejs + express-partials
app.get('/', function(request, response) {
	/*
	 * res.render('index.ejs') : layout.ejs가 있을 경우에는 layout.ejs를 레이아웃으로 지정하고 없는 경우에는 index.ejs만 표시
	 * res.render('index.ejs',{layout:false}) : 레이아웃을 적용하지 않고 index.ejs만 표시
	 * res.render('index.ejs',{layout:'mobile'}) : mobile.ejs를 레이아웃으로 지정하고 그 레이아웃에 index.ejs를 같이 표시
	 */
	response.render('test',{layout:'main'});
});

http.createServer(app).listen(9000, function() {
	logger.info('Express server listening on port '+9000);
});
