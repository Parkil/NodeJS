/**
 * NodeJS Websocket 예제
 */

var socketio = require('c:/Dev/language/nodejs/node_modules/socket.io');
var http 	 = require('http');
var fs		 = require('fs');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});
var express	 = require('c:/Dev/language/nodejs/node_modules/express');

//좌석 정보
var seats = [
             [1,1,0,1,1,0,0,0,0,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
             ];

var app = express();

//메인화면 
app.get('/',function(request,response) {
	fs.readFile('reserve.html', function(error,data) {
		response.send(data.toString()); //toString으로 지정하면 웹 그냥 data로 보내면 파일다운로드 처리가 된다.
	});
});

//좌석정보 표출
app.get('/seats' ,function(request,response, next) {
	response.send(seats);
});

var server = http.createServer(app).listen(9001, function(){logger.info('Server Started port 9001');});

//websocket
var io= socketio.listen(server);

io.sockets.on('connection', function(socket) {
	socket.on('reserve', function(data) {
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve',data);
	});
});