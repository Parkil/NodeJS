/*
 * flatiron framework 예제
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');
var fs		 = require('fs');

var flatiron = require('c:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });

var director = require('c:/Dev/language/nodejs/node_modules/director');
var plates	 = require('c:/Dev/language/nodejs/node_modules/plates');

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
var html	= '<div id="zzz"><a href="/zzz/ttt"></a></div>';
var html2	= '<div class="name"></div>';

var collection = [
                  	{'name' : 'aaa'},
                  	{'name' : 'bbb'},
                  	{'name' : 'ccc'}
                  ];
	
var data = {'newurl' : 'http://www.google.co.kr'};
var map	 = plates.Map();

//map.where('zzz').where('href').is('/').insert('newurl'); //zzz 속성을 가진 tag안에서 href속성을 가진 tag를 찾고 href의 '/' 값을 newurl속성값으로 변경
//map.where('zzz').where('href').has(/ttt/).insert('newurl'); //위와 동일하지만 차이점은 has(정규식으로 수정대상을 검색)를 이용하여 href의 /ttt부분을 newurl속성값으로 변경
//map.where('id').is('zzz').insert('newurl'); //id가 zzz인 곳에 newurl속성을 입력

//map.class('test').to('test2');

//var output = plates.bind(html2, data2, map);
var output = plates.bind(html2, collection); //collection을 이용하여 반복적으로 html을 조작하도록 처리

/*
 * readFile과 readFileSync의 차이
 * readFile은 비동기적으로 작동하고 보통 3번째 인자에 callback함수를 저장하낟.
 * readFileSync는 동기적으로 작동한다.
 */
function showAuthor() {
	logger.info('showAuthor');
	//this.res.writeHead(200, {'Content-Type' : 'text/plain'});
	//this.res.end('Carl Sagan');
	//this.res.end(output);
	
	var ttt = this.res;
	var html = fs.readFileSync('aaaa.html', 'utf-8');
	//logger.info(html);
	this.res.end(html);
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




