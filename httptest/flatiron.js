/*
 * flatiron framework 예제
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');

var flatiron = require('d:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var logger	 = require('d:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });

var director = require('d:/Dev/language/nodejs/node_modules/director');
var plates	 = require('d:/Dev/language/nodejs/node_modules/plates');

app.use(flatiron.plugins.http);

/*
 * flatiron plates
 * 
 * [html의 내용을 변경]
 * -html tag안의 innerHTML 변경
 * var html   = '<div id="zzz"></div>';
 * var data	  = {'zzz' : 'div value'};
 * var result = plates.bind(html, data);
 * 
 * div tag안의 text가 'div value'로 변경된다.
 * 
 * -html tag의 속성 변경
 * var html  = '<a href="/"></a>';
 * var data2 = {'newurl' : 'http://www.google.co.kr'};
 * var map	 = plates.Map();
 * 
 * map.where('href').is('/').insert('newurl');
 * 
 * var result = plates.bind(html, data2, map);
 * 
 * a href='/' 의 내용이 http://www.google.co.kr로 변경된다.
 */
var html = '<div class="test">Old Value</div><div class="test">Old Value</div><div class="test">Old Value</div><div class="test">Old Value</div>';
var html2 = '<a href="/"></a>';

var data = {'test' : 'New Value111'}; //html에서 id나 class가 test인 부분의 innerHtml을 New Value로 변경
var data2 = {'newurl' : 'http://www.google.co.kr'};
var map	 = plates.Map();

//map.where('href').is('/').insert('newurl');

//map.class('test').to('test2');

var output = plates.bind(html2, data2, map);
	
function showAuthor() {
	logger.info('showAuthor');
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	//this.res.end('Carl Sagan');
	this.res.end(output);
}

function addInfo() {
	logger.info('addInfo');
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('Add Info');
}

/*
 * express와 달리 route변수를 설정하여 url에 해당하는 동작을 지정할 수 있다.
 * {} 안의 옵션은 get,post,on(웹에서 사용하는건 아니고 CLI환경에서 사용)등이 있다
 * '/aaa' : { get : aaa} -> /aaa url을 입력하면 aaa 함수를 실행한다.
 * 
 * '/aaa' : {
 * 		get : aaa,
 * 		'/bbb' : { get : bbb }
 * } -> /aaa url을 입력하면 aaa함수를 /aaa/bbb url을 입력하면 aaa 함수를 먼저실행하고 bbb함수를 실행한다.
 */
var routes = {
	'/author': {
		get: showAuthor,
		'/addInfo' : {get : addInfo}
	}
};

var router = new director.http.Router(routes);

var server = http.createServer(function(req, res) {
	router.dispatch(req, res, function(err) {
		logger.info('request url : '+req.url);
		if(err) {
			logger.info(err);
			res.writeHead(404);
			res.end();
		}
	});
});

router.get('/zzz', function() {
	this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	this.res.end('zzz');
});

server.listen(9000);




