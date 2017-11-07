/**
 * tcp 서버 예제
 */

var net = require('net');

var server = net.createServer(function(conn) {
	console.log('connected');
	
	conn.on('data', function(data) {
		console.log(data+' from '+ conn.remoteAddress +' '+conn.remotePort);
		conn.write('Echo : '+data);
	});
	
	conn.on('close', function() {
		console.log('client closeed connection');
	});
}).listen(8124);

console.log('listening on port 8124')
