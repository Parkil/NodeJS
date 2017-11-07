/**
 * http://usejsdoc.org/
 */

var http = require('http');
var file = require('fs');

function writeNumber(res) {
	var counter = 0;
	
	for(var i = 0; i<100 ; i++) {
		counter++;
		res.write(counter.toString() + '\n');
	}
}

http.createServer(function(req, res) {
	var query = require('url').parse(req.url).query;
	console.log(req.url); //chrome의 경우 /favicon.ico를 호출시마다 호출하게 되어 있으므로 이를 걸러야 함
	console.log(query);
	var app   = require('querystring').parse(query).file + '.js';
		
	res.writeHead(200,{'content-Type' : 'text/plain; charset=utf8'});
		
	writeNumber(res);
		
	setTimeout(function() {
		console.log('opening '+ app);
			
		file.readFile(app, 'utf8', function(err,data) {
			if(err) {
				console.log('can not read file');
			}else {
				res.write(data);
			}
			res.end();
		});
	},2000);
}).listen(10000);
	
console.log('server running');