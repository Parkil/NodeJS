/**
 * connect 미들웨어 샘플
 */

var connect = require('c:/Dev/nodejs/node_modules/connect');
var c_static = require('c:/Dev/nodejs/node_modules/connect-static');
var logger = require('c:/Dev/nodejs/node_modules/connect-logger');
var custom = require('./customModule');
//var c_cookie_session = require('c:/Dev/nodejs/node_modules/connect-cookie-session');
var path = require('path');
var http = require('http');
var fs = require('fs');
/*
 * use를 이용하여 middleware를 원하는 만큼 추가 가능
 
var app = connect()
	//.use(connect.favicon()) //지금버전에서는 connect에서 지원하지 않고 따로 npm으로 분리됨
	//.use(connect.logger()) //지금버전에서는 connect에서 지원하지 않고 따로 npm으로 분리됨
	.use(function(req, res) {
		res.end('Hello world');
	});

http.createServer(app).listen(8080);
*/

//connect static을 이용한 정적 서버 예제
var app = connect();

console.log(connect);

//logger 설정
var writeStream = fs.createWriteStream('./log.txt', { flags : 'a', 'encoding' : 'utf8', 'mode' : 0666});
app.use(logger({
	//format : '%date %status %method %url (%route - %time)' //아무것도 지정하지 않았을 경우와 동일
	stream : writeStream
}));


//app.use(c_cookie_session.cookieParser());
app.use(function(req, res, next) {
	console.log('sssss',req.cookies);
	next();
});

app.use(custom('./public/main.html', '404', '403')); //사용자 정의 미들웨어 실행

var options = {
  dir: "public",
  aliases: [
    ['/', '/main.html'],
  ],
  ignoreFile: function(fullPath) {
    var basename = path.basename(fullPath);
    return /^\./.test(basename) || /~$/.test(basename);
  },
  followSymlinks: true,
  cacheControlHeader: "max-age=0, must-revalidate",
};
c_static(options, function(err, middleware) {
  if (err) throw err;
  app.use('/', middleware);
});


http.createServer(app).listen(8081);
