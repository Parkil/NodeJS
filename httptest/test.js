/**
 * NodeJS Websocket 예제
 */

var socketio = require('c:/Dev/language/nodejs/node_modules/socket.io');
var http 	 = require('http');
var fs		 = require('fs');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});
var express	 = require('c:/Dev/language/nodejs/node_modules/express');
var ejs		 = require('c:/Dev/language/nodejs/node_modules/ejs');
var hashmap	 = require('c:/Dev/language/nodejs/node_modules/hashmap');

var app = express();
var server = http.createServer(app).listen(9001, function(){logger.info('Server Started port 9001');});

function tracker(id, name, lat, lon, date) {
	this.id = id;
	this.name = name;
	this.lat = lat;
	this.lon = lon;
	this.date = date;
}

//이미지 저장 폴더
app.use(express.static('public',__dirname + 'public'));

app.get('/tracker', function(request,response) {
	var html = fs.readFileSync('test.html', 'utf-8');
	
	response.send(html);
});

app.get('/observer', function(request,response) {
	var html = fs.readFileSync('test2.html', 'utf-8');
	
	response.send(html);
});

app.get('/showdata', function(request,response) {
	response.send(hashmap);
});


//websocket
var io = socketio.listen(server);
var id = 0;

io.sockets.on('connection', function(socket) {
	socket.on('join', function(data) {
		socket.join(data);
	});
	
	socket.on('location', function(data) {
		var track_info = new tracker(id++, data.name, data.latitude, data.longitude);
		
		hashmap.set(id, track_info);
		
		io.sockets.in(data.name).emit('receive' ,{
			latitude : data.latitude,
			longitude : data.longitude,
			date : Date.now()
		});
	});
});