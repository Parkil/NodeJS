/**
 * crossroad(라우팅 미들웨어) 예제
 */

var crossroads = require('c:/Dev/nodejs/node_modules/crossroads');
var http = require('http');

/*
 * 해당 url이 입력되면 아래의 로직을 실행한다.
 */
crossroads.addRoute('/category/{type}/:pub:/:id:', function(type, pub, id) { //{~}는 반드시 있어야 하고 :~:는 있어도 그만 없어도 그만
	console.log(type, pub, id);
	
	if(!id && !pub) {
		console.log('Accessing all entries of category', type);
		return;
	}else if(!id) {
		console.log('Accessing all entries of category '+type+' and pub '+pub);
		return;
	}else {
		console.log('Accessing item '+id+' of pub '+pub+'of category '+type);
	}
});

/*
 * 이런식으로 url과 url매치로직을 분리하는것도 가능
 */
var route = crossroads.addRoute('/category2/{type}/{id}');

route.matched.add(function(type, id) {
	console.log('category2',type,id);
})

http.createServer(function(req, res) {
	crossroads.parse(req.url);
	res.end('dummy page');
}).listen(8080);
