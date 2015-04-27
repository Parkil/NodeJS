/**
 * flatiron resourceful 기본 예제
 */

var resource = require('c:/Dev/language/nodejs/node_modules/resourceful');
resource.use('memory'); //메모리에 저장

var author = resource.define('author');
author.string('name'); //name 이란 문자열 속성을 생성

//resource에 새로운 항목 입력 id는 나중에 값을 불러올때 사용된다.
author.create({
	id : 'alkain77',
	name : 'Park il'
}, function(err, id) {
	console.log(id);
});

author.create({
	id : 'ofvalor',
	name : 'Park il1'
}, function(err, id) {
	console.log(id);
});

//id를 지정하지 않으면 임의의 id가 자동으로 생성된다.
author.create({
	name : 'no id insert'
}, function(err, id) {
	console.log(id);
});

//id를 key값으로 입력한 속성값을 불러온다
author.get('alkain77', function(err,result) {
	console.log(err,result);
});

//id 여러개를 key값으로 하여 여러속성을 한번에 불러온다.(로직을 좀더 확인 필요)
author.get(['Park il', 'Park il1'], function(err,result) {
	console.log('multi get',err,result);
});

//속성의 값으로 속성을 검색
author.find({name : 'Park il'}, function(err,result) {
	console.log('curr',err,result);
});

//id를 key값으로 해당 속성 삭제
author.destroy('alkain77', function(err, result) {
	console.log(err, result);
});

/*
 * 아래와 같이 속성 생성시 속성값을 여러개 생성하는것도 가능
 */
var creature = resource.define('creature', function() {
	this.string('diet');
	this.bool('vertebrate');
	this.array('belly');
	
	this.timestamps();
	
	this.prototype.feed = function(food) {
		this.belly.push(food);
	};
});

var wolf = new(creature)({
	diet : 'carnivore',
	vertebrate : true
});

console.log(wolf.belly);
wolf.feed('goat');
console.log(wolf.belly);