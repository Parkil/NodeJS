/**
 * NodeJS Websocket 예제
 */

var socketio = require('c:/Dev/language/nodejs/node_modules/socket.io');
var http 	 = require('http');
var fs		 = require('fs');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var server = http.createServer(function(request,response) {
	fs.readFile('test.html', function(error, data) {
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.end(data);
	});
}).listen(9001, function() {
	logger.info('Server Start');
});

//websocket 서버 생성
var io = socketio.listen(server);

/*
 * websocket 이벤트 설정
 * emit : 이벤트 발생
 * on   : emit으로 발생한 이벤트 처리
 */

/*
 * public	 : 자기 자신을 포함한 모든 client에게 이벤트 처리 ex) io.emit('echo', data);
 * broadcast : 자신을 제외한 나머지 client에게 이벤트 처리 ex) c_socket.broadcast.emit('echo', data);
 * private	 : 특정 클라이언트에게만 전송 ex)io.sockets.in(ttt).emit('echo',data); //ttt는 socket.id임
 */
var ttt = 0;
io.sockets.on('connection', function(c_socket) {
	logger.info('web socket connected by client');
	if(ttt == 0) {
		ttt = c_socket.id;
	}
	
	logger.info(io.sockets.clients());
	//logger.info(io.sockets[ttt].toString());
	
	c_socket.on('recv', function(data) {
		logger.info('receive massage from client : '+data);
		io.sockets.in(ttt).emit('echo',data);
		//c_socket.broadcast.emit('echo', data);
		logger.info('echoing...');
	});
});


