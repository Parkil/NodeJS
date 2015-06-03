/*
 * flatiron union middleware 예제
 * 
 */

var http	 = require('http');
var fs		 = require('fs');

var flatiron = require('c:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });
var director = require('c:/Dev/language/nodejs/node_modules/director');
var union 	 = require('c:/Dev/language/nodejs/node_modules/union');
var nstatic  = require('c:/Dev/language/nodejs/node_modules/node-static');

//before,after 함수 지정
function before(req, res) {
	logger.info('before');
}

function after() {
	logger.info('after');
}
//before,after 함수지정 끝 

//route callback 함수 지정
function index() {
	this.res.writeHead('Content-Type', 'text/html');
	//var html = '<img src="/chrome.png"/>';
	var html = fs.readFileSync('input.html', 'utf-8');
	this.res.end(html);
}

function index_post() {
	console.log(this.req.body);
	this.res.redirect('/index');
}

function main() {
	this.res.redirect('/index');
}
//route callback 함수 지정 끝

/*
 * route 지정 
 * route 지정시 문제가 되는 부분은 node-static,serve-static같이 이미지/파일을 표시하는 프로그램과 같이 사용시
 * 이미지/파일을 표시하기 위해서는 url에 /~로 써야하는데 route에 지정이 되어 있지 않으면 표시가 되지 않는 문제가 발생한다.
 * 이를 해결하기 위해서는
 * 1.if(!found) 로직에 이미지 및 파일을 표시하는 로직 생성
 * 2.routes 지정시 이미지를 표시하도록 지정(이건 이미지별로 지정을 해주어야 하기 때문에 비효율적일듯)
 * 
 * - route를 지정하지 않고 router.get/post를 직접호출할때는 어떻게 되는지는 테스트 하지 않음
 */
var routes = {
	'/index' : { get : index, post : index_post },
	'/'		 : { get : main }
};

var route = new director.http.Router(routes);


/*
//app.use를 이용하여 서버 실행전,실행후 미들웨어를 지정 단 이경우에는
app.use(flatiron.plugins.http, {
	before : [forward],
	after  : [after]
});

app.listen(9003, function() {
	logger.info('Server Started Port 9003');
});
*/

var file = new nstatic.Server('d:/public');

function forward(req, res) {
	var chunks = [];
	req.on('data', function(chunk) {
		req.chunks.push(chunk);
	});
	
	var found = route.dispatch(req,res);
	if(!found) {
		console.log(req.url);
		
		/*
		 * node-static에서 지정한 폴더안에 있는 파일을 웹에서 접근이 가능하도록 처리 
		 * ex) d:/public으로 지정했을경우
		 * d:/public/chrome.png -> <img src="/chrome.png"/>로 접근가능
		 */
		file.serve(req,res); 
		//res.end('page Not Found');
	}
}

var server = union.createServer({
	before : [
	          forward
	          ]
});

server.listen(9000);
logger.info('Server Started port 9000');