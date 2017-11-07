/**
 * 파일을 읽어들이는 예제
 */

var http = require('http');
var file = require('fs');

http.createServer(function(req,res) {
	file.readFile('htmlfile.html', 'utf8', function(err, data){
		res.writeHead(200, {'content-Type' : 'text/html;charset=utf8'});
		
		if(err) {
			res.write('Can not read file');
		}else {
			res.write(data);
		}
		res.end();
	});
}).listen(10000); //listen에는 port번호뿐 아니라 unix 소켓에도 연결이 가능

console.log('server running');