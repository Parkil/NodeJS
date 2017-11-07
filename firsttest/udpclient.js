/**
 * UDP 클라이언트 예제 
 */

var dgram = require('dgram');

var client = dgram.createSocket('udp4')

process.stdin.resume();

process.stdin.on('data', function(data) {
	console.log(data.toString('utf8'));

	//TCP가 문자열을 바로 보내는데 반해 UDP는 버퍼를 이용하여 송신하는점이 차이가 있음.
	//TCP가 서버접속이 안되면 오류메시지를 내는데 반해 UDP는 서버접속여부와 상관없이 보내는점을 유의할것
	client.send(data, 0, data.length, 20001, 'localhost', function(err,bytes) {
		if(err) {
			console.log('error : '+err);
		}else {
			console.log('successful send');
		}
	});
});