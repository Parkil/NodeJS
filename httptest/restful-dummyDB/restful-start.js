/*
 * Restful 서비스 시작
 * 
 * User를 제외한 나머지는 Chrome PostMan을 사용한다.
 * 
 * DummyDB를 사용한 restful 게시판 기능 작성
 */

/*
 * 기본 서비스 설정
 */
var fs		= require('fs');
var http	= require('http');
var express = require('c:/Dev/language/nodejs/node_modules/express');
var logger	= require('c:/Dev/language/nodejs/node_modules/custom-logger').config({level : 0});

var bodyparser	= require('c:/Dev/language/nodejs/node_modules/body-parser');

var db = require("./restful-dummyDB");

var ejs		= require('c:/Dev/language/nodejs/node_modules/ejs');


var app = express();

app.set('case sensitive routes', false);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.raw());
//app.use(bodyparser.text());
//app.use(bodyparser.json());

/*
 * router url 설정
 */

//List
app.get("/", function(request,response) {
	fs.readFile('list.html', 'utf-8', function(error, data) {
		response.send(ejs.render(data, {data : db.get()}));
	});
});

//InsertView / UpdateView
app.get("/user", function(request,response) {
	var id = request.param('id');
	var name = '';
	var region = '';
	var target_html = 'insert.html';
	
	if(typeof(id) != 'undefined') {
		name = request.param('name');
		region = request.param('region');
		target_html = 'update.html';
	}
	
	fs.readFile(target_html, 'utf-8' ,function(error,data) {
		response.send(ejs.render(data, {id : id, name : name, region : region}));
		//response.send(data);
	});
});

//Insert
app.post("/user", function(request,response) {
	var name	= request.param('name');
	var region	= request.param('region');
	
	if(name && region) {
		var data = db.insert({name : name, region : region});
		logger.info("data inserted");
		response.redirect("/");
	}else {
		response.send("input data invalid");
	}
});

/*
 * url 호출시 /usr/1 처럼 호출을 하게 되면 app.get에서 :id로 지정된 부분을 파라메터로 인식하게 되며
 * request.param을 이용하여 데이터를 가져올 수 있다.
 */
//view
app.get("/user/:id", function(request,response) {
	var viewVal = db.get(request.param('id'));
	fs.readFile('view.html', 'utf-8', function(error,data) {
		response.send(ejs.render(data, {id : request.param('id'), value : viewVal}));
	});
});

//update
app.post("/update/:id", function(request,response) {
	var id = request.param('id');
	var name	= request.param('name');
	var region	= request.param('region');
	
	var value = db.get(id);
	value.name = name;
	value.region = region;
	
	response.redirect("/");
	//response.send(value);
});

//delete
app.post("/delete/:id", function(request,response) {
	var id = request.param('id');
	
	var result = db.remove(id);
	
	response.redirect("/");
	//response.send(result);
});

/*
 * Html에서는 form에서 더이상 PUT / DELETE를 지원하지 않음(http://www.w3.org/TR/2010/WD-html5-diff-20101019/#changes-2010-06-24 참고)
 * 아래 app.put / app.delet는 Chrome postman용 예제임
 * 
 */
//update
app.put("/user/:id", function(request,response) {
	var id = request.param('id');
	var name	= request.param('name');
	var region	= request.param('region');
	
	var value = db.get(id);
	value.name = name;
	value.region = region;
	
	response.send(value);
});

//delete
app.del("/user/:id", function(request,response) {
	var id = request.param('id');
	
	var result = db.remove(id);
	
	response.send(result);
});

/*
 * 서버 시작
 */
http.createServer(app).listen(8081 , function() {
	logger.info('Server Started At http://127.0.0.1:8081');
});
