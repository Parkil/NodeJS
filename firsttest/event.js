/**
 * eventemitter 예제
 */

/*
 * eventemitter 객체를 생성하여 사용하는 예제
 */

/*
var eventemitter = require('events').EventEmitter;
var counter = 0;

var em = new eventemitter();
setInterval(function() {
	em.emit('timed', counter++);
},1000);


em.on('timed', function(data) {
	console.log('timed',data);
});
*/

/*
 * eventemitter를 상속받아서 사용하는 예제
 */
var fs = require('fs');
var util = require('util');
var eventEmitter = require('events').EventEmitter;

function inputChecker(name, file) {
	this.name = name;
	this.writeStream = fs.createWriteStream('d:/'+file+'.txt', {
		'flags' : 'a',
		'encoding' : 'utf8',
		'mode' : '0666'
	});
}

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function check(input) {
	var command = input.toString().trim().substr(0,3);
	
	if(command === 'wr:') {
		this.emit('write', input.substr(3,input.length));
	}else if(command === 'en:') {
		this.emit('end');
	}else {
		this.emit('echo', input);
	}
};

var ic = new inputChecker('inputchecker', 'output');

ic.on('write', function(data) {
	console.log('write data to file', data);
	this.writeStream.write(data, 'utf-8');
});

ic.on('echo', function(data) {
	console.log(this.name +' wrote ' + data);
});

ic.on('end', function() {
	process.exit();
});

process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(input) {
	ic.check(input);
});




