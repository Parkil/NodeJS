/**
 * NodeJS Websocket 예제
 */

var socketio = require('c:/Dev/language/nodejs/node_modules/socket.io');
var http 	 = require('http');
var fs		 = require('fs');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});
var express	 = require('c:/Dev/language/nodejs/node_modules/express');
var ejs		 = require('c:/Dev/language/nodejs/node_modules/ejs');

var counter = 0;

//개별 상품 저장 구조
function Product(name, image, price, count) {
	this.index	= counter++;
	this.name	= name;
	this.price	= price;
	this.count	= count;
}

//전체상품목록
var Products = [
                new Product('JavaScript', 'chrome.png', 28000,30),
                new Product('jQuery'	, 'chrome.png', 28000,30),
                new Product('node.js'	, 'chrome.png', 32000,30),
                new Product('Socket.io'	, 'chrome.png', 17000,30),
                new Product('Connect'	, 'chrome.png', 18000,30),
                new Product('Express'	, 'chrome.png', 31000,30),
                new Product('EJS'		, 'chrome.png', 12000,30),
                ];

var app = express();
var server = http.createServer(app).listen(9001, function(){logger.info('Server Started port 9001');});

//이미지 저장 폴더
app.use(express.static('public',__dirname + 'public'));

app.get('/', function(request,response) {
	var html = fs.readFileSync('test.html', 'utf-8');
	
	response.send(ejs.render(html, {
		products : Products
	}));
});


//websocket
var io= socketio.listen(server);

io.sockets.on('connection', function(socket) {
	function onReturn(index) {
		Products[index].count++;
		
		clearTimeout(cart[index].timerID);
		
		delete cart[index];
		
		io.sockets.emit('count', {
			index : index,
			count : Products[index].count
		});
	}
	
	var cart = {};
	
	socket.on('cart', function(index) {
		Products[index].count--;
		
		cart[index] = {};
		cart[index].index = index;
		cart[index].timerID = setTimeout(function() {
			onReturn(index);
		}, 1000*60*60); //장바구니 제한시간 설정
		
		io.sockets.emit('count', {
			index : index,
			count : Products[index].count
		});
	});
	
	socket.on('buy', function(index) {
		clearTimeout(cart[index].timerID);
		
		delete cart[index];
		
		io.sockets.emit('count', {
			index : index,
			count : Products[index].count
		});
	});
	
	socket.on('return', function(index) {
		onReturn(index);
	});
});