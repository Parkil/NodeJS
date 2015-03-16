/**
 * NodeJS Websocket 예제
 */

var socketio = require('c:/Dev/language/nodejs/node_modules/socket.io');
var http 	 = require('http');
var fs		 = require('fs');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var server = http.createServer(function(request,response) {
	fs.readFile('chat.html', function(error, data) {
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.end(data);
	});
}).listen(9001, function() {
	logger.info('Server Start port 9001');
});

//websocket 서버 생성
var io = socketio.listen(server);


io.sockets.on('connection', function(socket) {
	logger.info('web socket connected by client');
	
	/*
	 * 구버전에서는 socket.set(name,value) socket.get(name,callback)을 이용하여 socket에데이터를 저장했으나
	 * 신버전(1.3.5)에서는 socket.name = value형식으로 socket에 데이터를 저장하고 socket.name으로 데이터를 가져온다.
	 */ 
	socket.on('join', function(data) {
		socket.join(data);
		socket.room = data;
	});	
	
	socket.on('message', function(data) {
		io.sockets.in(socket.room).emit('print message',"["+socket.room+"] : "+data);
	});
});


