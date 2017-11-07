/**
 * http://usejsdoc.org/
 */
var util = require('util');
var jsdom = require('dns');

/*
 * util.inspect - 객체를 문자열로 표시
 * 1st - 표시할 객체
 * 2st - 열거불가능 속성을 표시할지 여부
 * 3nd - 재귀탐색 회수 null일 경우 객체내의 모든 요소를 탐색함
 * 4st - 출력문자열에 ansi색상 표시 여부
 */
//console.log(util.inspect(jsdom, true, null, true));


function sup() {}
sup.var1 = 'first';
sup.print = function() {
	console.log(this.var1);
	console.log('sdfsdafsdfd');
};

sup.print();
sup.prototype.exec = function() {
	console.log('super prototype exec');
};

function sub() {
	sub.super_.call(this);
}
util.inherits(sub, sup); //nodejs 라이브러리를 이용한 상속
//sub.prototype = new sup(); //원래 prototype을 이용한 상속

var aaa = new sub();
aaa.exec();



