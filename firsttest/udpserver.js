/**
 * UDP 서버 예제
 */

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message', function(msg, rinfo) {
	console.log('Message : '+msg+' from '+rinfo.address+':'+rinfo.port);
});

server.bind(20001);
